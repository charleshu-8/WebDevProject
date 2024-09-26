"use client";

// Form component for taking username and password for verification
import Link from "next/link";

export default function Form() {
  // TODO: Add functionality when ingesting username and password
  async function handleResponse(response: FormData) {
    const email = response.get("email");
    const password = response.get("password");
    console.log(email, password);
  }

  return (
    <form
      action={handleResponse}
      className="flex flex-col items-left justify-center"
    >
      <div className="w-full dark:text-white">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-2 mt-5 mb-1 w-full text-gray-900 text-xs border border-1 border-grey rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-even-darker-blue dark:border-very-light-gray dark:text-very-light-gray"
        />
      </div>
      <div className="w-full mb-1">
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="p-2 w-full mb-1 text-gray-900 text-xs border border-1 border-grey rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-even-darker-blue dark:border-very-light-gray dark:text-very-light-gray"
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
          className="border text-xs rounded-md pt-2 pb-2 pr-4 pl-4 mt-3 mb-2 bg-darker-blue border-darker-blue text-white dark:bg-very-light-gray dark:text-black"
        >
          Sign In
        </button>
      </div>
      <div className="text-xs space-x-2 text-blue-600 underline dark:text-very-light-gray">
        <Link href={"/auth/signup"}>Create Account</Link>
        <Link href="/auth/password-recovery">Forgot Password?</Link>
      </div>
    </form>
  );
}
