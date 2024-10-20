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
      className="m-10 flex w-screen flex-col items-center justify-center"
    >
      <div>
        <input
          name="email"
          type="email"
          placeholder="Enter Email:"
          required
          className="rounded-md border border-0 border-b-2 border-b-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          className="mt-5 rounded-md border border-darker-blue bg-darker-blue p-3 text-white"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}
