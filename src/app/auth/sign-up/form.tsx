"use client";

import { useContext } from "react";
import { SignUpContext } from "./page";
import PocketBase from "pocketbase";

// Form component for user sign up information
export default function Form() {
  const { pfp } = useContext(SignUpContext);

  // Handle form submission
  async function handleResponse(response: FormData) {
    if (pfp) {
      const pb = new PocketBase("https://slackers.pockethost.io");

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
      console.log(data);

      try {
        const record = await pb.collection("users").create(data);
        console.log(record);
      } catch (e) {
        console.log(e);
      }

      // (optional) send an email verification request
      // await pb.collection("users").requestVerification("test@example.com");
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
      <p className="w-full pt-6 font-bold text-black dark:text-dim-white">
        Register:
      </p>
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
              className="w-full rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
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
              className="w-full rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
            />
          </div>
        </div>
      </div>
      {/*Personal Info Label*/}
      <p className="mt-50 w-full pt-5 font-bold text-black dark:text-dim-white">
        Personal Info:
      </p>
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
              className="w-full rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
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
              className="w-full rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
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
              className="w-full rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
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
              className="w-full rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
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
              className="h-full w-full resize-none rounded-md border-2 border-darker-blue bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-darker-blue focus:ring-darker-blue dark:border-dark-mode-blue-highlight dark:bg-darkest-blue dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight"
            />
          </div>
        </div>
      </div>
      {/*Signup Button Container*/}
      <div className="flex flex-row justify-center"></div>
      {/*Signup Button*/}
      <div>
        <button
          type="submit"
          className="rounded-md border border-darker-blue bg-darker-blue px-16 py-3 font-bold text-white dark:bg-dim-white dark:text-darker-blue"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
