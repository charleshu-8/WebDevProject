"use client";

// Form component for taking username and password for verification
import Link from "next/link";

export default function Form() {
  // Handle email submission
  // TODO: Add functionality when ingesting username and password
  async function handleResponse(response: FormData) {
    const username = response.get("username");
    const password = response.get("password");
    console.log(username, password);
  }

  return (
    <form
      action={handleResponse}
      className="flex flex-col items-left justify-center"
    >
      <div className="w-full">
        <input
          name="username"
          type="username"
          placeholder="Username"
          required
          className="p-2 mt-4 mb-1 w-full text-gray-900 text-xs border border-1 border-grey rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="w-full">
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="p-2 w-full mb-1 text-gray-900 text-xs border border-1 border-grey rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="text-sm">
        <input
          name="staySignedIn"
          type="checkbox"
          placeholder="Stay Signed In"
          className=""
        />
        Stay Signed In
      </div>
      <div>
        <button
          type="submit"
          className="border rounded-md p-3 mt-5 bg-darker-blue border-darker-blue text-white"
        >
          Sign In
        </button>
      </div>
      <div className="space-x-4">
        <Link href={"../signup"}
              className="text-sm">
          Create Account</Link>
        <Link href="/auth/password-recovery"
              className="text-sm">
          Forgot Password</Link>
      </div>
    </form>
  );
}
