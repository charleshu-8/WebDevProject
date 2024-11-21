import { getMotionDetails } from "./motions";
import { pb } from "./pocketbase";
import { PocketbaseMessage } from "./pocketbaseInterfaces";

// Create a new message in DB
// Returns response if successful, false otherwise
export async function addNewMessage(
  text: string,
  owner: string,
  motion: string,
  displayName: string,
) {
  try {
    // Pass message creation request
    const response = (await pb.collection("messages").create({
      text: text,
      owner: owner,
      motion: motion,
      displayName: displayName,
    })) as PocketbaseMessage;

    // Pull current message list for the motion
    const currentMessages = (await getMotionDetails(motion)).messages;
    // Then update the motion to include the new message
    await pb
      .collection("motions")
      .update(motion, { messages: [...currentMessages, response.id] });

    return response;
  } catch (e) {
    console.error("Message creation error: " + e);
    return false;
  }
}
