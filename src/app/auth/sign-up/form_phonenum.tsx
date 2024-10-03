"use client";

// Form component for requesting first name for Sign Up
export default function PhoneNumForm() {
  // Handle first name submission
  async function handleResponse(response: FormData) {
    const phonenum = response.get("phonenum");
    // Just throw out inputted name for now
    console.log(phonenum);
  }

  return (
    <form
      action={handleResponse}
      className="flex flex-col w-full justify-center"
    >
      <div className="w-full">
        <input
          name="phonenum"
          type="phonenum"
          placeholder="Phone Number:"
          required
          className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </form>
  );
}
