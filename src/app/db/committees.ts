import { pb } from "./pocketbase";
import { PocketbaseCommittee, PocketbaseMotion } from "./pocketbaseInterfaces";
import { getCorrespondingUserID, getUserCommittees } from "./users";

// Create a new committee in DB given a committee title and list of members
// Returns response if successful, false otherwise
export async function addNewCommitteee(
  title: string,
  members: string[],
  chair: string,
) {
  // Map member list to corresponding internal ID in DB
  for (const member in members) {
    members[member] = await getCorrespondingUserID(members[member]);
  }

  try {
    // Pass committee creation request
    const response = await pb.collection("committees").create({
      title: title,
      members: members,
      chair: await getCorrespondingUserID(chair),
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

// Return DB record for a given committee
// Returns record if found, empty object otherwise
export async function getCommitteeDetails(committee: string) {
  try {
    return (await pb
      .collection("committees")
      .getOne(committee)) as PocketbaseCommittee;
  } catch (e) {
    console.error("Committee fetching error: " + e);
    return {
      collectionId: "",
      collectionName: "",
      id: "",
      title: "",
      members: [],
      motions: [],
      chair: "",
      created: "",
      updated: "",
    };
  }
}

// Returns list of motion IDs for given committee ID
// If none found, return empty array
export async function getCommitteeMotions(committee: string) {
  try {
    return (
      await pb.collection("committees").getOne(`${committee}`, {
        fields: "motions",
      })
    ).motions as string[];
  } catch (e) {
    console.error("Committee motions fetching error: " + e);
    return [];
  }
}

// Returns list of member IDs for given committee ID
// If none found, return empty array
export async function getCommitteeMembers(committee: string) {
  try {
    return (
      await pb.collection("committees").getOne(`${committee}`, {
        fields: "members",
      })
    ).members as string[];
  } catch (e) {
    console.error("Committee members fetching error: " + e);
    return [];
  }
}

// Returns list of motion objects for given committee ID
// If none found, return empty array
export async function getFullCommitteeMotions(committee: string) {
  try {
    return (
      await pb.collection("committees").getOne(`${committee}`, {
        expand: "motions",
      })
    ).expand?.motions as PocketbaseMotion[];
  } catch (e) {
    console.error("Full committee motions fetching error: " + e);
    return [];
  }
}

// Returns ID of chair for given committee ID
// If none found, return empty string
export async function getCommitteeChair(committee: string) {
  try {
    return (
      await pb.collection("committees").getOne(`${committee}`, {
        fields: "chair",
      })
    ).chair as string;
  } catch (e) {
    console.error("Committee chair fetching error: " + e);
    return "";
  }
}

// Get all committees according to the given filter
// If none found, returns empty array
export async function getFilteredCommittees(
  filter: string,
  sortBy: string,
  expand: string,
) {
  try {
    return (await pb.collection("committees").getFullList({
      sort: sortBy,
      filter: filter,
      expand: expand,
    })) as PocketbaseCommittee[];
  } catch (e) {
    console.error("Committees fetching error: " + e);
    return [];
  }
}
