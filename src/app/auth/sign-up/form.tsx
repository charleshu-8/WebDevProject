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
      <p className="mt-10 text-black dark:text-dim-white font-bold w-full">
        Register:
      </p>
      {/*Username and Password Row*/}
      <div className="flex flex-row justify-center space-x-4 w-full mb-30">
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="username"
              type="text"
              placeholder="Enter Username:"
              required
              className="w-full p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
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
              className="w-full p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
            />
          </div>
        </div>
      </div>
      {/*Personal Info Label*/}
      <p className="pt-5 text-black dark:text-dim-white font-bold mt-50 w-full">
        Personal Info:
      </p>
      {/*Firstname and Lastname Row*/}
      <div className="flex flex-row justify-center space-x-4 w-full">
        <div className="flex-1 w-full justify-center">
          <div className="w-full">
            <input
              name="firstname"
              type="text"
              placeholder="First Name:"
              required
              className="w-full p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
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
              className="w-full p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
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
              className="w-full p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
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
              className="w-full p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
            />
          </div>
        </div>
      </div>
      {/*Short Bio Row*/}
      <div className="flex flex-row justify-center space-x-4 h-100 w-full">
        <div className="flex-1 w-full h-full justify-center">
          <div className="w-full h-full">
            <textarea
              name="shortbio"
              rows={5}
              placeholder="Short Bio (100 words max):"
              required
              className="w-full h-full resize-none p-3 text-gray-900 text-sm border-2 border-darker-blue bg-gray-50 outline-none rounded-md focus:ring-darker-blue focus:border-darker-blue dark:bg-darkest-blue dark:border-dark-mode-blue-highlight dark:focus:ring-dark-mode-blue-highlight dark:focus:border-dark-mode-blue-highlight dark:text-dark-mode-blue-highlight dark:placeholder-dark-mode-blue-highlight"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center"></div>
      {/*Signup Button*/}
      <div>
        <button
          type="submit"
          className="border rounded-md py-3 px-16 font-bold bg-darker-blue dark:bg-dim-white border-darker-blue text-white dark:text-darker-blue"
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
