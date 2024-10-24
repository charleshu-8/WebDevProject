"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Form from "./form";
import UploadAndDisplayImage from "./pfp";

export interface ISignUpState {
  pfp: File | null;
  setPfp: Dispatch<SetStateAction<File | null>>;
}

export const SignUpContext = createContext<ISignUpState>({
  pfp: null,
  setPfp: () => {},
});

export default function SignUp() {
  // Define state variable to track and pass user selected PFP between components
  const [pfp, setPfp] = useState<File | null>(null);

  return (
    // Screen Background
    <main className="h-full w-full">
      {/* Main Container */}
      <div className="mt-6 flex h-full w-full flex-col">
        {/* Create Your Account Label */}
        <h1 className="mb-12 mt-6 pb-6 text-center text-dark-text">
          Create Your Account
        </h1>
        {/* Rectangle Container */}
        <div className="flex flex-col items-center">
          {/* Main White Form Rectangle */}
          <div className="relative mb-12 mt-16 w-4/5 rounded-xl bg-light-background p-6 md:w-2/3 lg:w-3/5 dark:bg-dark-secondary">
            {/* Profile Picture White Background Circle */}
            <div
              className="absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-light-background md:h-40 md:w-40 lg:h-48 lg:w-48 dark:bg-dark-secondary"
              onClick={handleProfilePictureClick}
              style={{
                overflow: "hidden",
              }}
            >
              {/* Profile Picture Circle */}
              <div className="h-28 w-28 rounded-full md:h-36 md:w-36 lg:h-44 lg:w-44">
                <SignUpContext.Provider value={{ pfp: pfp, setPfp: setPfp }}>
                  <UploadAndDisplayImage />
                </SignUpContext.Provider>
              </div>
            </div>
            {/* Label below the profile picture circle */}
            <h2 className="mt-10 pt-2 text-center font-bold md:pt-4 lg:pt-7">
              Add Profile Picture
              <br />
              (Double Click/Tap to Remove)
            </h2>
            {/* Form Component */}
            <SignUpContext.Provider value={{ pfp: pfp, setPfp: setPfp }}>
              <Form />
            </SignUpContext.Provider>
            {/* Bottom of page text: Already have an account? Login */}
            <p className="mt-2 text-center">
              Already have an account?{" "}
              <a href="/auth/login" className="hypertext-styling">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
