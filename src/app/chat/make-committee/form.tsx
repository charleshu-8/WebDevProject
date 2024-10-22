"use client";

// Form component for making a committee
export default function Form() {
  // Handle committee creation
  // TODO: Add functionality when creating committee
  async function handleResponse(response: FormData) {
    const email = response.get("email");
    const committeeName = response.get("committeename");

    console.log(email);
    console.log(committeeName);
  }

  return (
    <form
      action={handleResponse}
      className="border-secondary flex h-full w-full flex-col space-y-6 rounded-xl border-2 p-8"
    >
      {/*Committee Name Row*/}
      <div className="flex w-full flex-row">
        <label htmlFor="committeename">
          Committee Name:
          <input
            name="committeename"
            type="text"
            placeholder="committee 1"
            required
            className="ml-4 border-b border-black"
          />
        </label>
      </div>
      {/*Start time Row*/}
      <div className="w-full">
        <label htmlFor="time">Start time:</label>
      </div>
      {/*Invite Member Row*/}
      <div className="flex w-full flex-row">
        <label htmlFor="email">
          Invite Member:
          <input
            name="email"
            type="text"
            className="ml-4 border-b border-black"
            placeholder="johnd@gmail.com"
          />
        </label>
      </div>
      {/*Current Members Row?*/}
      <div className="w-full">
        <h1>Members:</h1>
      </div>
      {/*Submit Button*/}
      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="justify-center rounded-full border-2 border-darker-blue px-16 py-3 font-bold text-darker-blue"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            console.log("Submit Committee Creation");
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
