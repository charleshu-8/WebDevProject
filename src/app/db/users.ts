import { pb } from "./pocketbase";

// Takes given email or username and maps it to the corresponding ID in the DB
// If ID for email or username not found, returns empty string
export async function getCorrespondingUserID(key: string) {
  // Pull users records
  const records = await pb.collection("users").getFullList({
    fields: "id, username, email",
  });

  // Check if we can find an ID for given key
  const keyRecord = records.filter(
    (record) => record.username === key || record.email === key,
  );

  return keyRecord.length === 0 ? "" : keyRecord[0].id;
}

// Returns list of participating committee IDs for given user ID
export async function getUserCommittees(id: string) {
  return (
    await pb.collection("users").getOne(`${id}`, {
      fields: "committees",
    })
  ).committees as string[];
}
