"use client";

// Form component for making a committee
export default function Form() {
  // Handle committee creation
  // TODO: Add functionality when creating committee
  async function handleResponse(response: FormData) {
    const email = response.get("email");
    const committeeName = response.get("committeename");
  }

  return (
    <form
      action={handleResponse}
      className="border-secondary flex h-full w-full flex-col space-y-6 rounded-xl border-2 p-8"
    >
      {/*Committee Name Row*/}
      <div className="flex w-full flex-row">
        <h1 className="pr-4">Committee Name:</h1>
        <input
          name="committeename"
          type="text"
          placeholder="committee 1"
          required
          className="border-b border-black"
        />
      </div>
      {/*Start time Row*/}
      <div className="w-full">
        <h1>Start time:</h1>
      </div>
      {/*Invite Member Row*/}
      <div className="flex w-full flex-row">
        <h1>Invite Member:</h1>
        <input
          name="email"
          type="text"
          className="border-b border-black"
          placeholder="johnd@gmail.com"
        />
      </div>
      {/*Current Members Row?*/}
      <div className="w-full"></div>
      {/*Submit Button*/}
      <div className="w-full items-center justify-center">
        <button
          type="submit"
          className="justify-center rounded-md border border-darker-blue bg-darker-blue px-16 py-3 font-bold text-white dark:bg-dim-white dark:text-darker-blue"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            console.log("Signup Button Pressed");
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
