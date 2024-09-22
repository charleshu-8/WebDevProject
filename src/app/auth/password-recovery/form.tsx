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
      className="w-screen m-10 flex flex-col items-center justify-center"
    >
      <div>
        <input
          name="email"
          type="email"
          placeholder="Enter Email:"
          required
          className="p-3 text-gray-900 text-sm bg-gray-50 border border-0 border-b-2 border-b-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          className="border rounded-md p-3 mt-5 bg-darker-blue border-darker-blue text-white"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}
