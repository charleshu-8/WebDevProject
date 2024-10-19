"use client";

import Form from "./form";
import UploadAndDisplayImage from "./pfp";

export default function SignUp() {
  // Handle Profile Picture Click
  // TODO: Add functionality when ingesting user data
  const handleProfilePictureClick = () => {
    // Just throw out a "button clicked" message for now
    console.log("Profile picture button clicked");
  };

  return (
    // Screen Background
    <main className="h-screen w-screen">
      {/* Main Container */}
      <div className="mt-6 flex h-screen w-screen flex-col">
        {/* Create Your Account Label */}
        <h1 className="text-dark-text mb-12 mt-6 pb-6 text-center">
          Create Your Account
        </h1>
        {/* Rectangle Container */}
        <div className="flex flex-col items-center">
          {/* Main White Form Rectangle */}
          <div className="bg-light-background dark:bg-dark-secondary relative mb-12 mt-16 w-4/5 rounded-xl p-6 md:w-2/3 lg:w-3/5">
            {/* Profile Picture White Background Circle */}
            <div
              className="bg-light-background dark:bg-dark-secondary absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full md:h-40 md:w-40 lg:h-48 lg:w-48"
              onClick={handleProfilePictureClick}
              style={{
                overflow: "hidden",
              }}
            >
              {/* Profile Picture Circle */}
              <div
                className="h-28 w-28 rounded-full md:h-36 md:w-36 lg:h-44 lg:w-44"
                onClick={handleProfilePictureClick}
              >
                <UploadAndDisplayImage />
              </div>
            </div>
            {/* Label below the profile picture circle */}
            <h2 className="mt-10 pt-2 text-center font-bold md:pt-4 lg:pt-7">
              Add Profile Picture
              <br />
              (Double Click/Tap to Remove)
            </h2>
            {/* Form Component */}
            <Form />
            {/* Bottom of page text: Already have an account? Login */}
            <p className="mt-4 text-center">
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
