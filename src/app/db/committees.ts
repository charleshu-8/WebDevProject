import { pb } from "./pocketbase";
import { PocketbaseCommittee } from "./pocketbaseInterfaces";
import { getCorrespondingUserID, getUserCommittees } from "./users";

// Create a new committee in DB given a committee title and list of members
// Returns response if successful, false otherwise
export async function addNewCommitteee(title: string, members: string[]) {
  // Map member list to corresponding internal ID in DB
  for (const member in members) {
    members[member] = await getCorrespondingUserID(members[member]);
  }

  try {
    // Pass committee creation request
    const response = await pb.collection("committees").create({
      title: title,
      members: members,
    });

    // Then update each member to note inclusion in committee
    for (const member of members) {
      // Pull current committee list
      const currentCommittees = await getUserCommittees(member);
      // Then push user update of participating committees
      await pb
        .collection("users")
        .update(member, { committees: [...currentCommittees, response.id] });
    }

    return response as PocketbaseCommittee;
  } catch (e) {
    console.error("Committee creation error: " + e);
    return false;
  }
}

// Returns list of motion IDs for given committee ID
// If none found, return empty array

export async function getCommitteeMotions(id: string) {
  try {
    return (
      await pb.collection("committees").getOne(`${id}`, {
        fields: "motions",
      })
    ).motions as string[];
  } catch (e) {
    console.error("Committee motions fetching error: " + e);
    return [];
  }
}
