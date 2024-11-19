import { getCommitteeMotions } from "./committees";
import { pb } from "./pocketbase";

// Create a new motion in DB given a motion title and associated committee ID
// Returns true if successful, false otherwise
export async function addNewMotion(title: string, committee: string) {
  try {
    // Pass motion creation request
    const response = await pb
      .collection("motions")
      .create({ title: title, committee: committee });

    // Pull current motion list for the committee
    const currentMotions = await getCommitteeMotions(committee);
    // Then update the committee to include the new motion
    await pb
      .collection("committees")
      .update(committee, { motions: [...currentMotions, response.id] });

    return true;
  } catch (e) {
    console.error("Motion creation error: " + e);
    return false;
  }
}
