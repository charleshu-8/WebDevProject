import { getCommitteeMotions } from "./committees";
import { pb } from "./pocketbase";
import { PocketbaseMessage, PocketbaseMotion } from "./pocketbaseInterfaces";

// Create a new motion in DB given a motion title and associated committee ID
// Returns response if successful, false otherwise
export async function addNewMotion(title: string, committee: string) {
  try {
    // Pass motion creation request
    const response = (await pb
      .collection("motions")
      .create({ title: title, committee: committee })) as PocketbaseMotion;

    // Pull current motion list for the committee
    const currentMotions = await getCommitteeMotions(committee);
    // Then update the committee to include the new motion
    await pb
      .collection("committees")
      .update(committee, { motions: [...currentMotions, response.id] });

    return response;
  } catch (e) {
    console.error("Motion creation error: " + e);
    return false;
  }
}

// Return DB record for a given motion
// Returns record if found, empty object otherwise
export async function getMotionDetails(motion: string) {
  try {
    return (await pb.collection("motions").getOne(motion)) as PocketbaseMotion;
  } catch (e) {
    console.error("Motion fetching error: " + e);
    return {
      collectionId: "",
      collectionName: "",
      id: "",
      title: "",
      committee: "",
      messages: [],
      created: "",
      updated: "",
    };
  }
}

// Returns list of message objects for given motion ID
// If none found, returns empty array
export async function getFullMotionMessages(motion: string) {
  try {
    return (
      await pb.collection("motions").getOne(`${motion}`, {
        expand: "messages",
      })
    ).expand?.messages as PocketbaseMessage[];
  } catch (e) {
    console.error("Full motion messages fetching error: " + e);
    return [];
  }
}

// Get all motions according to the given filter
// If none found, returns empty array
export async function getFilteredMotions(
  filter: string,
  sortBy: string,
  expand: string,
) {
  try {
    return (await pb.collection("motions").getFullList({
      sort: sortBy,
      filter: filter,
      expand: expand,
    })) as PocketbaseMotion[];
  } catch (e) {
    console.error("Motions fetching error: " + e);
    return [];
  }
}

export async function voted(motion: string) {
  try {
    return (
      await pb.collection("motions").getOne(`${motion}`, {
        fields: "voted",
      })
    ).voted as boolean;
  } catch (e) {
    console.error("Voting status fetching error: " + e);
    return false;
  }
}

export async function setVoted(motion: string, voted: boolean) {
  try {
    return await pb.collection("motions").update(`${motion}`, { voted: voted });
  } catch (e) {
    console.error("Voting status update error: " + e);
    return false;
  }
}
