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
          className="form-styling"
        />
      </div>
      <div>
        <p>
          <button type="submit" className="button-styling mt-5 p-3">
            Reset Password
          </button>
        </p>
      </div>
    </form>
  );
}
