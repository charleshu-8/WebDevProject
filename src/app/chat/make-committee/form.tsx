"use client";

import { text } from "stream/consumers";
import { JsxElement } from "typescript";

// Form component for making a committee
export default function Form() {
  // Handle committee creation
  // TODO: Add functionality when creating committee
  async function handleResponse(response: FormData) {
    const committeeName = response.get("committeename");
    console.log(committeeName);
  }

  return (
    <form
      action={handleResponse}
      className="flex h-full w-full flex-col space-y-6 rounded-xl border-2 border-secondary bg-white p-8"
    >
      {/*Committee Name Row*/}
      <div className="flex w-full flex-row">
        <label htmlFor="committeename" className="w-1/3">
          Committee Name:
        </label>
        <input
          name="committeename"
          type="text"
          placeholder="committee 1"
          required
          className="float-right w-2/3 border-b border-black"
        />
      </div>
      {/*Start time Row*/}
      <div className="w-full">
        <label htmlFor="time">Start time:</label>
      </div>
      {/*Invite Member Row*/}
      <div className="flex w-full flex-row">
        <label className="w-1/3" htmlFor="email">
          Invite Member:
        </label>
        <div className="w-2/3">
          <input
            id="email-to-invite"
            name="email"
            type="text"
            className="grow border-b border-black"
            placeholder="johnd@gmail.com"
          />
          <button
            type="button"
            className="float-right ml-4 h-7 w-fit rounded-md border-2 border-secondary px-1 text-center align-middle text-secondary"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              //Get email from Invite Member input and discard @gmail etc.
              //console.log("Add member button pressed");
              const email = document.getElementById(
                "email-to-invite",
              ) as HTMLInputElement;

              const nameToAdd = email.value;

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(nameToAdd)) {
                console.error("Invalid email format.");
                alert("Please enter a valid email");
                return;
              }

              // Split the email at the "@" character
              const username = nameToAdd.split("@")[0];

              //email.value = "";

              //TO DO Create New div for new member
              const members = document.getElementById(
                "current-members",
              ) as HTMLDivElement;
              //const newMember = document.createElement("div");
              //const newMember = makeNewMemberItem(username, "Member");
              const newMember = makeNewMemberItem2(username, "member");

              members.append(newMember);
            }}
          >
            Add member
          </button>
        </div>
      </div>
      {/*Current Members Row*/}
      <div className="flex w-full flex-row">
        <h1 className="w-1/3">Members:</h1>
        {/*Members List*/}
        <div
          id="current-members"
          className="flex w-2/3 flex-row space-x-4 overflow-auto"
        >
          {/*Outer div for individual member*/}
          <div className="flex flex-row">
            <div className="mr-2 content-center">
              <div className="h-3 w-3 rounded-full bg-darker-blue"></div>
            </div>
            <div className="flex flex-col">
              <p>You</p>
              <p className="text-xs text-gray-shadow">Owner</p>
            </div>
          </div>
        </div>
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

//Included in Button Now
// function getUsernameFromEmail(email: string): string {
//   // Check if the email is valid
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     console.error("Invalid email format.");
//     return "error";
//   }

//   // Split the email at the "@" character
//   const username = email.split("@")[0];
//   return username;
// }

function makeNewMemberItem(name: string, role: string): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="mr-2 content-center">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
      <div className="flex flex-col">
        <p>{name}</p>
        <p className="text-xs text-gray-shadow">{role}</p>
      </div>
    </div>
  );
}

function makeNewMemberItem2(name: string, role: string): HTMLDivElement {
  const memberDiv = document.createElement("div");
  memberDiv.className = "flex flex-row";

  const iconDiv = document.createElement("div");
  iconDiv.className = "mr-2 content-center";

  const icon = document.createElement("div");
  icon.className = "bg-red-500 h-3 w-3 rounded-full";

  const textDiv = document.createElement("div");
  textDiv.className = "flex flex-col";

  const memberName = document.createElement("p");
  memberName.textContent = name;

  const roleDiv = document.createElement("p");
  roleDiv.className = "text-xs text-gray-shadow";
  roleDiv.innerText = role;

  textDiv.appendChild(memberName);
  textDiv.appendChild(roleDiv);

  iconDiv.appendChild(icon);

  memberDiv.appendChild(iconDiv);
  memberDiv.appendChild(textDiv);

  return memberDiv;
}
