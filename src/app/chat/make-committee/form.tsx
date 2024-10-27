"use client";

// Form component for making a committee
export default function Form() {
  // Handle committee creation
  // TODO: Add functionality when creating committee
  async function handleResponse(response: FormData) {
    const committeeName = response.get("committeename");
    const startHour = response.get("hour");
    const startMinutes = response.get("minutes");
    const timeZone = response.get("time-zone");
    const amPM = response.get("am-pm");

    console.log(committeeName);
    console.log(startHour);
    console.log(startMinutes);
    console.log(timeZone);
    console.log(amPM);
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
      {/* <div className="w-full">
        <label htmlFor="time" className="w-1/3">
          Start time:
        </label>
        {/*Div for Time Input Boxes
        <div className="float-right flex w-2/3 flex-row space-x-4">
          <input
            type="number"
            name="hour"
            min={1}
            max={12}
            className="justify-center rounded border-2 border-gray-shadow text-center align-middle"
          />
          <p>:</p>
          <input
            type="number"
            name="minutes"
            min={0}
            max={59}
            step={15}
            className="rounded border-2 border-gray-shadow text-center"
          />
          <select
            name="am-pm"
            id="am-pm"
            className="rounded border-2 border-gray-shadow bg-inherit px-1 text-center"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          {/*Time zone selector for all of U.S. zones and some other
            major time zones*
          <select
            name="time-zone"
            id="time-zone"
            className="rounded border-2 border-gray-shadow bg-inherit text-center"
          >
            <option value="EST">EST</option>
            <option value="CST">CST</option>
            <option value="MST">MST</option>
            <option value="PST">PST</option>
            <option value="AKST">AKST</option>
            <option value="HST">HST</option>
            <option value="JST">JST</option>
            <option value="CST">CST</option>
            <option value="IST">IST</option>
            <option value="CET">CET</option>
            <option value="WET">WET</option>
          </select>
        </div>
      </div> */}
      {/*Invite Member Row*/}
      <div className="flex w-full flex-row">
        <label className="w-1/3" htmlFor="email">
          Invite Member:
        </label>
        <div className="flex w-2/3 flex-row">
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

              console.log(email.value);

              const nameToAdd = email.value;

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(nameToAdd)) {
                console.error("Invalid email format.");
                alert("Please enter a valid email");
                return;
              }

              // Split the email at the "@" character
              const username = nameToAdd.split("@")[0];

              //TO DO: Save the email to later perform the actual invite
              //For now just reset the input and adds visible member element
              email.value = "";

              addNewMemberItem(username, "Member");
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
          {/*Creator of the Committee is default auto displayed as owner*/}
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

function addNewMemberItem(name: string, role: string) {
  const members = document.getElementById("current-members") as HTMLDivElement;

  const memberDiv = document.createElement("div");
  memberDiv.className = "flex flex-row";

  const iconDiv = document.createElement("div");
  iconDiv.className = "mr-2 content-center";

  const icon = document.createElement("div");
  icon.className = "h-3 w-3 rounded-full";

  const textDiv = document.createElement("div");
  textDiv.className = "flex flex-col";

  const memberName = document.createElement("p");
  memberName.textContent = name;

  const roleDiv = document.createElement("p");
  roleDiv.className = "text-xs text-gray-shadow";
  roleDiv.innerText = role;

  //Icon color should be red for members
  //darker-blue for the owner
  if ((role = "Member")) {
    icon.className = icon.className + " bg-red-500";
  } else if ((role = "Owner")) {
    icon.className = icon.className + " bg-darker-blue";
  }

  textDiv.appendChild(memberName);
  textDiv.appendChild(roleDiv);

  iconDiv.appendChild(icon);

  memberDiv.appendChild(iconDiv);
  memberDiv.appendChild(textDiv);

  members.append(memberDiv);
}
