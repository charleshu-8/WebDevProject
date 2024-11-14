import PocketBase from "pocketbase";

export const pb = new PocketBase("https://slackers.pockethost.io");

export let currentUser = pb.authStore.model;
export const currentCommittee = "91ttrau140qhgdc"; //placeholder, missing logic
export const currentMotion = "esco3pacuipvqre"; //placeholder, missing logic

pb.authStore.onChange(() => {
  console.log("User changed");
  currentUser = pb.authStore.model;
  console.log(currentUser);
});
