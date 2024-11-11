"use client";
import React, { useState } from "react";
import heart from "../res/heart.svg"; // Import the default heart icon
import pressedHeart from "../res/pressed_heart.svg"; // Import the pressed heart icon
import pro from "../res/pro.svg"; // Import the pro icon
import pressedPro from "../res/pressed_pro.svg"; // Import the pressed pro icon
import con from "../res/con1.svg"; // Import the con icon
import pressedCon from "../res/pressed_con.svg"; // Import the pressed con icon
import neutral from "../res/neutral.svg"; // Import the neutral icon
import pressedNeutral from "../res/pressed_neutral.svg"; // Import the pressed neutral icon
import send from "../res/send.svg"; // Import the send icon
import Textarea from "@mui/joy/Textarea"; // Import the Input component from the MUI Joy library

interface ChatInputFieldProps {
  onSendMessage: (message: string) => void;
}
// Form component for requesting email for password recovery
export default function ChatInputField({ onSendMessage }: ChatInputFieldProps) {
  // State to track whether the icon is pressed
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const [isProPressed, setIsProPressed] = useState(false);
  const [isConPressed, setIsConPressed] = useState(false);
  const [isNeutralPressed, setIsNeutralPressed] = useState(false);
  const [message, setMessage] = useState(""); // State to track the message input

  // Toggle the heart button state
  function handleHeartClick(): void {
    setIsHeartPressed(!isHeartPressed);
  }

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
          {/* Heart Icon Container */}
          <div className="mr-2 flex h-4/5 items-center">
            {/* Heart Button/Icon */}
            <img
              className="h-full cursor-pointer"
              alt="Heart"
              src={isHeartPressed ? pressedHeart.src : heart.src} // Conditionally render the icon
              onClick={handleHeartClick} // Handle icon click
            />
          </div>
          {/* Pro Icon Container */}
          <div className="ml-2 mr-2 flex h-[70%] items-center">
            {/* Pro Button/Icon */}
            <img
              className="h-full cursor-pointer"
              alt="Pro"
              src={isProPressed ? pressedPro.src : pro.src} // Conditionally render the icon
              onClick={handleProClick} // Handle icon click
            />
          </div>
          {/* Con Icon Container */}
          <div className="ml-2 mr-2 flex h-[70%] items-center">
            {/* Con Button/Icon */}
            <img
              className="h-full cursor-pointer"
              alt="Con"
              src={isConPressed ? pressedCon.src : con.src} // Conditionally render the icon
              onClick={handleConClick} // Handle icon click
            />
          </div>
          {/* Neutral Icon Container */}
          <div className="ml-2 mr-2 flex h-[70%] items-center">
            {/* Neutral Button/Icon */}
            <img
              className="h-full cursor-pointer"
              alt="Neutral"
              src={isNeutralPressed ? pressedNeutral.src : neutral.src} // Conditionally render the icon
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
            <img
              className="h-full"
              alt="Send"
              src={send.src} // Conditionally render the icon
              onClick={handleSendClick} // Handle icon click
            />
          </div>
        </div>
      </div>
    </>
  );
}