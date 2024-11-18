import PocketBase from "pocketbase";

export const pb = new PocketBase("https://slackers.pockethost.io");

export let currentUser = pb.authStore.model;
let currentCommittee = "91ttrau140qhgdc"; //placeholder, missing logic
let currentMotion = "esco3pacuipvqre"; //placeholder, missing most logic
export function setCurrentMotion(motionId: string) {
  currentMotion = motionId;
}
export function getCurrentMotion() {
  return currentMotion;
}
export function setCurrentCommittee(committeeId: string) {
  currentCommittee = committeeId;
}

export function getCurrentCommittee() {
  return currentCommittee;
}

pb.authStore.onChange(() => {
  console.log("User changed");
  currentUser = pb.authStore.model;
  console.log(currentUser);
});
