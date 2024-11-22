"use client";

import React, { useState } from "react";
import Textarea from "@mui/joy/Textarea"; // Import the Input component from the MUI Joy library
import Image from "next/image";

interface ChatInputFieldProps {
  onSendMessage: (message: string) => void;
}

// Form component for requesting email for password recovery
export default function ChatInputField({ onSendMessage }: ChatInputFieldProps) {
  // States to track whether each icon is pressed
  const [isProPressed, setIsProPressed] = useState(false);
  const [isConPressed, setIsConPressed] = useState(false);
  const [isNeutralPressed, setIsNeutralPressed] = useState(false);
  const [message, setMessage] = useState(""); // State to track the message input

  // Toggle the pro button state
  function handleProClick(): void {
    setIsProPressed(!isProPressed);
    setIsConPressed(false); // Ensure that the con button is not pressed
    setIsNeutralPressed(false); // Ensure that the neutral button is not pressed
  }

  // Toggle the con button state
  function handleConClick(): void {
    setIsConPressed(!isConPressed);
    setIsProPressed(false); // Ensure that the pro button is not pressed
    setIsNeutralPressed(false); // Ensure that the neutral button is not pressed
  }

  // Toggle the neutral button state
  function handleNeutralClick(): void {
    setIsNeutralPressed(!isNeutralPressed);
    setIsProPressed(false); // Ensure that the pro button is not pressed
    setIsConPressed(false); // Ensure that the con button is not pressed
  }

  // Hand send button click
  function handleSendClick(): void {
    onSendMessage(message);
    setMessage(""); // Clear the text area after sending the message
  }

  return (
    <>
      {/* Main White Chat Field Input Box Container */}
      <div className="h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-extra-light-gray bg-white">
        {/* Gray Options Bar above chat input field */}
        <div className="flex h-1/5 items-center bg-extra-dim-gray pl-6">
          {/* Pro Icon Container */}
          <div className="ml-2 mr-2 flex h-[70%] items-center">
            {/* Pro Button/Icon */}
            <Image
              className="h-full cursor-pointer"
              alt="Pro"
              src={
                isProPressed
                  ? "/img/chat/pro_button_pressed.svg"
                  : "/img/chat/pro_button.svg"
              } // Conditionally render the icon
              width="56"
              height="20"
              onClick={handleProClick} // Handle icon click
            />
          </div>
          {/* Con Icon Container */}
          <div className="ml-2 mr-2 flex h-[70%] items-center">
            {/* Con Button/Icon */}
            <Image
              className="h-full cursor-pointer"
              alt="Con"
              src={
                isConPressed
                  ? "/img/chat/con_button_pressed.svg"
                  : "/img/chat/con_button.svg"
              } // Conditionally render the icon
              width="58"
              height="20"
              onClick={handleConClick} // Handle icon click
            />
          </div>
          {/* Neutral Icon Container */}
          <div className="ml-2 mr-2 flex h-[70%] items-center">
            {/* Neutral Button/Icon */}
            <Image
              className="h-full cursor-pointer"
              alt="Neutral"
              src={
                isNeutralPressed
                  ? "/img/chat/neutral_button_pressed.svg"
                  : "/img/chat/neutral_button.svg"
              } // Conditionally render the icon
              width="74"
              height="20"
              onClick={handleNeutralClick} // Handle icon click
            />
          </div>
        </div>
        {/* MUI Input with Send Button */}
        <div className="mb-6 ml-7 mr-7 mt-4 flex items-center justify-between">
          {/* MUI Input Component Container*/}
          <div className="m-1 mb-3 w-full">
            <Textarea
              name="Textarea"
              placeholder="I like this motion because..."
              variant="outlined"
              minRows={3}
              maxRows={3}
              size="sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Handle input change
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent default behavior of Enter key
                  handleSendClick(); // Trigger send button click
                }
              }}
            />
          </div>
          {/* Send Button/Icon Container*/}
          <div className="ml-2 mr-2 flex h-5/6 cursor-pointer items-center">
            {/* Send Button/Icon */}
            <Image
              className="h-full"
              alt="Send"
              src={"/img/chat/send_icon.svg"} // Conditionally render the icon
              width="40"
              height="40"
              onClick={handleSendClick} // Handle icon click
            />
          </div>
        </div>
      </div>
    </>
  );
}
