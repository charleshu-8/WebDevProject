"use client";

import { login } from "@/app/db/authentication";
import { pb } from "@/app/db/pocketbase";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Form component for taking username and password for verification
export default function Form() {
  const router = useRouter();

  // Process submitted form input and attempt log in
  async function handleResponse(response: FormData) {
    const email = (response.get("email") as FormDataEntryValue).toString();
    const password = (
      response.get("password") as FormDataEntryValue
    ).toString();

    const loginResponse = await login(email, password);

    if (loginResponse) {
      // Once approved, move to chat page
      console.log("User logged in");
      router.push("/chat");
    } else {
      console.log("Login failed");
    }
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
