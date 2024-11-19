import { pb } from "./pocketbase";

// Takes given email or username and maps it to the corresponding ID in the DB
// If ID for email or username not found, returns empty string
export async function getCorrespondingUserID(key: string) {
  try {
    // Pull users records
    const records = await pb.collection("users").getFullList({
      fields: "id, username, email",
    });

    // Check if we can find an ID for given key
    const keyRecord = records.filter(
      (record) => record.username === key || record.email === key,
    );

    return keyRecord.length === 0 ? "" : keyRecord[0].id;
  } catch (e) {
    console.error("Username/email translation error: " + e);
    return "";
  }
}

// Returns list of participating committee IDs for given user ID
// If none found, return empty array
export async function getUserCommittees(id: string) {
  try {
    return (
      await pb.collection("users").getOne(`${id}`, {
        fields: "committees",
      })
    ).committees as string[];
  } catch (e) {
    console.error("User committees fetching error: " + e);
    return [];
  }
}
