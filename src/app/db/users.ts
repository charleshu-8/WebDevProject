import { pb } from "./pocketbase";

// Takes given email or username and maps it to the corresponding ID in the DB
// If ID for email or username not found, returns empty string
export async function getCorrespondingUserID(emailOrUsername: string) {
  try {
    // Pull users records
    const records = await pb.collection("users").getFullList({
      fields: "id, username, email",
    });

    // Check if we can find an ID for given key
    const keyRecord = records.filter(
      (record) =>
        record.username === emailOrUsername || record.email === emailOrUsername,
    );

    return keyRecord.length === 0 ? "" : keyRecord[0].id;
  } catch (e) {
    console.error("Username/email translation error: " + e);
    return "";
  }
}

// Creates a mapping from ID to username
// Returns null if query attempt fails
export async function getIdUsernameMapping() {
  const idMap = new Map<string, string>();
  try {
    const response = await pb.collection("users").getFullList({
      fields: "id, username",
    });
    response.map((user) => idMap.set(user.id, user.username));
    return idMap;
  } catch (e) {
    console.error("ID-to-username translation error: " + e);
    return null;
  }
}

// Returns list of participating committee IDs for given user ID
// If none found, return empty array
export async function getUserCommittees(user: string) {
  try {
    
    return (await pb.collection("users").getOne(`${user}`, {
        fields: "committees",
      })
    ).committees;
  } catch (e) {
    console.error("User committees fetching error: " + e);
    return [];
  }
}
