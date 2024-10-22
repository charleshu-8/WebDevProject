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
      <div className="w-full dark:text-white">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border-1 border-grey mb-1 mt-5 w-full rounded-md border p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-very-light-gray dark:bg-even-darker-blue dark:text-very-light-gray"
        />
      </div>
      <div className="mb-1 w-full">
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border-1 border-grey mb-1 w-full rounded-md border p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-very-light-gray dark:bg-even-darker-blue dark:text-very-light-gray"
        />
      </div>
      <div className="text-xs">
        <label>
          <input
            name="staySignedIn"
            type="checkbox"
            placeholder="Stay Signed In?"
            className="mr-1"
          />
          Stay Signed In?
        </label>
      </div>
      <div>
        <button
          type="submit"
          className="mb-2 mt-3 rounded-md border border-darker-blue bg-darker-blue pb-2 pl-4 pr-4 pt-2 text-xs text-white dark:bg-very-light-gray dark:text-black"
        >
          Sign In
        </button>
      </div>
      <div className="space-x-2 text-xs text-blue-600 underline dark:text-very-light-gray">
        <Link href={"/auth/sign-up"}>Create Account</Link>
        <Link href="/auth/password-recovery">Forgot Password?</Link>
      </div>
    </form>
  );
}
