import { pb } from "../pocketbase";

// Log in given user
export async function login(username: string, password: string) {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);
    return authData;
  } catch (e) {
    console.error(`Login error: ${e}`);
    return null;
  }
}

// Log out last authenticated user
export async function logout() {
  pb.authStore.clear();
}
