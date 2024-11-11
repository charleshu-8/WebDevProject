import PocketBase from "pocketbase";

export const pb = new PocketBase("https://slackers.pockethost.io");

export let currentUser = pb.authStore.model;
export let currentCommittee = "91ttrau140qhgdc"; //placeholder, missing logic
export let currentMotion = "esco3pacuipvqre"; //placeholder, missing logic

pb.authStore.onChange(() => {
  console.log("User changed");
  currentUser = pb.authStore.model;
  console.log(currentUser);
});
