import { pb } from "./pocketbase";
import { getCorrespondingUserID } from "./users";

// Create a new committee in DB given a committee title and list of members
// Returns true if successful, false otherwise
export async function addNewCommitteee(title: string, members: string[]) {
  // Map member list to corresponding internal ID in DB
  for (const member in members) {
    members[member] = await getCorrespondingUserID(members[member]);
  }

  try {
    // Pass creation request
    await pb.collection("committees").create({
      title: title,
      members: members,
    });
    return true;
  } catch (e) {
    console.error("Committee creation error: " + e);
    return false;
  }
}
