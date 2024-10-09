"use client";
import Form from "./form";

export default function SignUp() {
  // Handle Profile Picture Click
  // TODO: Add functionality when ingesting user data
  // Just throw out a "button clicked" message for now
  const handleProfilePictureClick = () => {
    console.log("Profile picture button clicked");
  };

  return (
    // Screen Background
    <div className="min-h-screen w-full bg-darker-blue dark:bg-black overscroll-none">
      {/* Main Container */}
      <main className="min-h-screen w-full flex flex-col mt-6 bg-darker-blue dark:bg-black overscroll-none">
        {/* Create Your Account Label */}
        <h1 className="text-6xl mt-6 mb-8 pb-6 text-white dark:text-dim-white font-thin text-center">
          Create Your Account
        </h1>
        {/* Rectangle Container */}
        <div className="flex flex-col items-center">
          {/* Main White Form Rectangle */}
          <div className="relative mt-16 mb-12 bg-white dark:bg-darker-blue rounded-xl p-6 w-4/5 md:w-2/3 lg:w-3/5">
            {/* Profile Picture White Background Circle */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 bg-white circle rounded-full dark:bg-darker-blue border-none flex items-center justify-center">
              {/* Profile Picture Button within circle that is clickable to actually add a profile picture */}
              <button
                className="w-3/4 pt-20 mt-2 md:pt-20 md:mt-20 lg:pt-24 lg:mt-24 focus:outline-none flex justify-center"
                onClick={handleProfilePictureClick}
              >
                {/* Profile icon or image here */}
                <img
                  src="/auth/sign-up/icon2.png"
                  alt="Profile Icon"
                  className="w-full h-full rounded-full object-cover"
                />
              </button>
            </div>
            {/* Label below the profile picture circle */}
            <p className="text-center mt-6 pt-4 md:pt-8 lg:pt-14 text-black dark:text-gray-300 font-bold">
              Add Profile Picture
            </p>
            {/* Form Component */}
            <Form />
            {/* Bottom of page text: Already have an account? Login */}
            <p className="text-center mt-4">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-blue-600 underline dark:text-blue-500 hover:no-underline"
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
