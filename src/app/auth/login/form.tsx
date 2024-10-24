"use client";

import Link from "next/link";
import PocketBase from "pocketbase";

// Form component for taking username and password for verification
export default function Form() {
  async function handleResponse(response: FormData) {
    const email = (response.get("email") as FormDataEntryValue).toString();
    const password = (
      response.get("password") as FormDataEntryValue
    ).toString();
    console.log(email, password);

    const pb = new PocketBase("https://slackers.pockethost.io");

    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model?.id);

    // "logout" the last authenticated account
    pb.authStore.clear();
  }

  return (
    <form
      action={handleResponse}
      className="items-left flex flex-col justify-center"
    >
      <div className="w-full">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="form-styling mb-1 mt-5 w-full"
        />
      </div>
      <div className="mb-1 w-full">
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="form-styling mb-1 w-full"
        />
      </div>
      <p>
        <label>
          <input
            name="staySignedIn"
            type="checkbox"
            placeholder="Stay Signed In?"
            className="mr-1 mt-1"
          />
          Stay Signed In?
        </label>
      </p>
      <div>
        <p>
          <button
            type="submit"
            className="button-styling mb-2 mt-3 pb-2 pl-4 pr-4 pt-2"
          >
            Sign In
          </button>
        </p>
      </div>
      <div className="flex space-x-2">
        <p className="hypertext-styling">
          <Link href={"/auth/sign-up"}>Create Account</Link>
        </p>
        <p className="hypertext-styling">
          <Link href="/auth/password-recovery">Forgot Password?</Link>
        </p>
      </div>
    </form>
  );
}
