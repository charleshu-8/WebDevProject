"use client";
import Form from "./form";
import UploadAndDisplayImage from "./pfp";

export default function SignUp() {
  // Handle Profile Picture Click
  // TODO: Add functionality when ingesting user data
  // Just throw out a "button clicked" message for now
  const handleProfilePictureClick = () => {
    console.log("Profile picture button clicked");
  };

  return (
    // Screen Background
    <div className="min-h-screen w-full bg-darker-blue dark:bg-black">
      {/* Main Container */}
      <main className="mt-6 flex min-h-screen w-full flex-col bg-darker-blue dark:bg-black">
        {/* Create Your Account Label */}
        <h1 className="mb-12 mt-6 pb-6 text-center text-6xl font-thin text-white dark:text-dim-white">
          Create Your Account
        </h1>
        {/* Rectangle Container */}
        <div className="flex flex-col items-center">
          {/* Main White Form Rectangle */}
          <div className="relative mb-12 mt-16 w-4/5 rounded-xl bg-white p-6 md:w-2/3 lg:w-3/5 dark:bg-darker-blue">
            {/* Profile Picture White Background Circle */}
            <div
              className="absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-none bg-white md:h-40 md:w-40 lg:h-48 lg:w-48 dark:bg-darker-blue"
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
            <p className="mt-10 pt-4 text-center font-bold text-black md:pt-8 lg:pt-14 dark:text-gray-300">
              Add Profile Picture
              <br />
              (Double Click/Tap to Remove)
            </p>
            {/* Form Component */}
            <Form />
            {/* Bottom of page text: Already have an account? Login */}
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-blue-600 underline hover:no-underline dark:text-blue-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
