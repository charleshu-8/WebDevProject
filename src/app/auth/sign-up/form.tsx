"use client";

// Form component for user sign up information
export default function Form() {
  // Handle form submission
  // TODO: Add functionality when ingesting user data
  async function handleResponse(response: FormData) {
    const username = response.get("username");
    const password = response.get("password");
    const firstName = response.get("firstname");
    const lastName = response.get("lastname");
    const email = response.get("email");
    const phoneNum = response.get("phonenum");
    const shortBio = response.get("shortbio");
    // Just throw out inputted data for now
    console.log(
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNum,
      shortBio,
    );
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
        <p>
          <button
            type="submit"
            className="button-styling rounded-md px-16 py-3"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              console.log("Signup Button Pressed");
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
}
