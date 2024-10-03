"use client";

// Form component for requesting last name for Sign Up
export default function LastNameForm() {
  // Handle first name submission
  async function handleResponse(response: FormData) {
    const lastname = response.get("lastname");
    // Just throw out inputted name for now
    console.log(lastname);
  }

  return (
    <form
      action={handleResponse}
      className="flex flex-col w-full justify-center"
    >
      <div className="w-full">
        <input
          name="lastname"
          type="name"
          placeholder="Last Name:"
          required
          className="w-full p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </form>
  );
}
