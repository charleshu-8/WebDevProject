"use client";

import { useContext } from "react";
import { ClientResponseError } from "pocketbase";
import { useRouter } from "next/navigation";
import { pb } from "@/app/pocketbase";
import { SignUpContext } from "./signUpContext";

// Form component for user sign up information
export default function Form() {
  const router = useRouter();
  const { pfp } = useContext(SignUpContext);

  // Handle form submission
  async function handleResponse(response: FormData) {
    // Check if PFP has been submitted by user
    if (pfp) {
      const data = {
        username: response.get("username"),
        password: response.get("password"),
        passwordConfirm: response.get("password"),
        email: response.get("email"),
        emailVisibility: true,
        firstName: response.get("firstname"),
        lastName: response.get("lastname"),
        phoneNumber: response.get("phonenum"),
        bio: response.get("shortbio"),
        avatar: pfp,
      };

      try {
        // Attempt creation request
        await pb.collection("users").create(data);
        // Then reroute to login page
        router.push("/auth/login");
      } catch (e) {
        // Log failure event
        console.error(
          `Account creation error: ${(e as ClientResponseError).response.message}`,
        );
        for (const cause in (e as ClientResponseError).response.data) {
          console.error(
            `${cause} - ${JSON.stringify((e as ClientResponseError).response.data[cause].code)}: ${JSON.stringify((e as ClientResponseError).response.data[cause].message)}`,
          );
        }
      }
    } else {
      console.error("No PFP Found");
    }
  }

  return (
    <form
      action={handleResponse}
      className="flex w-full flex-col items-center justify-center space-y-8 p-5"
    >
      {/*Register label*/}
      <h2 className="w-full pt-6 font-bold">Register:</h2>
      {/*Username and Password Row*/}
      <div className="mb-30 flex w-full flex-row justify-center space-x-4">
        {/*Username Container*/}
        <div className="w-full flex-1 justify-center">
          <div className="w-full">
            <input
              name="username"
              type="text"
              placeholder="Enter Username:"
              required
              className="form-styling w-full"
            />
          </div>
        </div>
        {/*Password Container*/}
        <div className="w-full flex-1 justify-center">
          <div className="w-full">
            <input
              name="password"
              type="password"
              placeholder="Enter password:"
              required
              className="form-styling w-full"
            />
          </div>
        </div>
      </div>
      {/*Personal Info Label*/}
      <h2 className="mt-50 w-full pt-5 font-bold">Personal Info:</h2>
      {/*Firstname and Lastname Row*/}
      <div className="flex w-full flex-row justify-center space-x-4">
        {/*Firstname Container*/}
        <div className="w-full flex-1 justify-center">
          <div className="w-full">
            <input
              name="firstname"
              type="text"
              placeholder="First Name:"
              required
              className="form-styling w-full"
            />
          </div>
        </div>
        {/*Lastname Container*/}
        <div className="w-full flex-1 justify-center">
          <div className="w-full">
            <input
              name="lastname"
              type="text"
              placeholder="Last Name:"
              required
              className="form-styling w-full"
            />
          </div>
        </div>
      </div>
      {/*Email and Phonenum Row*/}
      <div className="flex w-full flex-row justify-center space-x-4">
        {/*Email Container*/}
        <div className="w-full flex-1 justify-center">
          <div className="w-full">
            <input
              name="email"
              type="email"
              placeholder="Email:"
              required
              className="form-styling w-full"
            />
          </div>
        </div>
        {/*Phonenum Container*/}
        <div className="w-full flex-1 justify-center">
          <div className="w-full">
            <input
              name="phonenum"
              type="tel"
              placeholder="Phone Number:"
              required
              className="form-styling w-full"
            />
          </div>
        </div>
      </div>
      {/*Short Bio Row*/}
      <div className="h-100 flex w-full flex-row justify-center space-x-4">
        {/*Short Bio Container*/}
        <div className="h-full w-full flex-1 justify-center">
          <div className="h-full w-full">
            <textarea
              name="shortbio"
              rows={5}
              placeholder="Short Bio (100 words max):"
              required
              className="form-styling h-full w-full resize-none"
            />
          </div>
        </div>
      </div>
      {/*Signup Button Container*/}
      <div className="flex flex-row justify-center">
        {/*Signup Button*/}
        <h2>
          <button
            type="submit"
            className="button-styling rounded-md px-14 py-3"
          >
            Sign Up
          </button>
        </h2>
      </div>
    </form>
  );
}
