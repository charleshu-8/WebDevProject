import { pb } from "./pocketbase";
import { PocketbaseMessage } from "./pocketbaseInterfaces";

// Return DB record for a given message
// Returns record if found, false otherwise
export async function getMessageDetails(message: string) {
  try {
    return (await pb
      .collection("messages")
      .getOne(message)) as PocketbaseMessage;
  } catch (e) {
    console.error("Messsage fetching error: " + e);
    return false;
  }
}
