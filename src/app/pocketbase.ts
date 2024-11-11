import PocketBase from "pocketbase";

export const pb = new PocketBase("https://slackers.pockethost.io");

export let currentUser = pb.authStore.model;

pb.authStore.onChange(() => {
  console.log("User changed");
  currentUser = pb.authStore.model;
});
