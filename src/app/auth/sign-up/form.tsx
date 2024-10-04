"use client";

// Form component for requesting email for password recovery
export default function Form() {
  // Handle email submission
  // TODO: Add functionality when ingesting email
  async function handleResponse(response: FormData) {
    const email = response.get("email");
    // Just throw out inputted email for now
    console.log(email);
  }

  return (
    <form
      action={handleResponse}
      className="w-full flex flex-col items-center justify-center space-y-8 p-5"
    >
      {/*Register label*/}
      <p className="mt-10 text-black font-bold w-full">Register:</p>
      {/*Username and Password Row*/}
      <div className="flex flex-row justify-center space-x-4 w-full mb-30">
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="username"
              type="text"
              placeholder="Enter Username:"
              required
              className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="password"
              type="password"
              placeholder="Enter password:"
              required
              className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <p className="pt-5 text-black font-bold mt-50 w-full">Personal Info:</p>
      {/*Firstname and Lastname Row*/}
      <div className="flex flex-row justify-center space-x-4 w-full">
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="firstname"
              type="text"
              placeholder="First Name:"
              required
              className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="lastname"
              type="text"
              placeholder="Last Name:"
              required
              className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {/*Email and Phonenum Row*/}
      <div className="flex flex-row justify-center space-x-4 w-full">
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="email"
              type="email"
              placeholder="Email:"
              required
              className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="phonenum"
              type="tel"
              placeholder="Phone Number:"
              required
              className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {/*Short Bio Row*/}
      <div className="flex flex-row justify-center space-x-4 h-100 w-full">
        <div className="flex-1 w-full h-full justify-center">
          <div className="w-full h-full">
            <input
              name="shortbio"
              type="text"
              placeholder="Short Bio (100 words max):"
              required
              className="w-full h-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center"></div>
      {/*Signup Button*/}
      <div>
        <button
          type="submit"
          className="border rounded-md p-3 bg-darker-blue border-darker-blue text-white"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            console.log("Signup Button Pressed");
          }}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
