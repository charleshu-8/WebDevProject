"use client";
import React, { useState } from "react";
import heart from "../../res/heart.svg"; // Import the default heart icon
import pressedHeart from "../../res/pressed_heart.svg"; // Import the pressed heart icon
import pro from "../../res/pro.svg"; // Import the pro icon
import pressedPro from "../../res/pressed_pro.svg"; // Import the pressed pro icon
import con from "../../res/con1.svg"; // Import the con icon
import pressedCon from "../../res/pressed_con.svg"; // Import the pressed con icon
import neutral from "../../res/neutral.svg"; // Import the neutral icon
import pressedNeutral from "../../res/pressed_neutral.svg"; // Import the pressed neutral icon
import send from "../../res/send.svg"; // Import the send icon
import Textarea from "@mui/joy/Textarea"; // Import the Input component from the MUI Joy library

// Form component for requesting email for password recovery
export default function MotionInputField() {
  // State to track whether the icon is pressed
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const [isProPressed, setIsProPressed] = useState(false);
  const [isConPressed, setIsConPressed] = useState(false);
  const [isNeutralPressed, setIsNeutralPressed] = useState(false);

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
    // TODO: Add logic to send the message
  }

  return (
    <>
      {/* Main White Chat Field Input Box Container */}
      <div
        className="h-full w-full flex-col items-center justify-center rounded-lg bg-white"
        style={{ overflow: "hidden" }}
      >
        {/* Gray Options Bar above chat input field */}
        <div
          className="flex h-1/5 items-center bg-gray-shadow pl-6"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* Heart Icon Container */}
          <div className="mr-2 flex h-4/5 items-center">
            {/* Heart Button/Icon */}
            <img
              alt="Heart"
              src={isHeartPressed ? pressedHeart.src : heart.src} // Conditionally render the icon
              onClick={handleHeartClick} // Handle icon click
            />
          </div>
          {/* Pro Icon Container */}
          <div className="ml-2 mr-2 flex h-3/4 items-center">
            {/* Pro Button/Icon */}
            <img
              alt="Pro"
              src={isProPressed ? pressedPro.src : pro.src} // Conditionally render the icon
              onClick={handleProClick} // Handle icon click
            />
          </div>
          {/* Con Icon Container */}
          <div className="ml-2 mr-2 flex h-3/4 items-center">
            {/* Con Button/Icon */}
            <img
              alt="Con"
              src={isConPressed ? pressedCon.src : con.src} // Conditionally render the icon
              onClick={handleConClick} // Handle icon click
            />
          </div>
          {/* Neutral Icon Container */}
          <div className="ml-2 flex h-3/4 items-center">
            {/* Neutral Button/Icon */}
            <img
              alt="Neutral"
              src={isNeutralPressed ? pressedNeutral.src : neutral.src} // Conditionally render the icon
              onClick={handleNeutralClick} // Handle icon click
            />
          </div>
        </div>
        {/* 'Motion:' Declaration Text with Send Button */}
        <div className="ml-7 mr-7 mt-4 flex h-1/5 items-center justify-between">
          {/* Motion Text */}
          <p className="text-xl font-semibold">Motion:</p>
          {/* Send Button/Icon Container*/}
          <div className="ml-2 mr-2 flex h-5/6 cursor-pointer items-center">
            {/* Send Button/Icon */}
            <img
              alt="Send"
              src={send.src} // Conditionally render the icon
              onClick={handleSendClick} // Handle icon click
            />
          </div>
        </div>
        {/* MUI Input Component Container*/}
        <div className="mb-2 ml-7 mr-7 mt-2">
          <Textarea
            name="Textarea"
            placeholder="I move that…"
            variant="outlined"
            minRows={3}
            maxRows={3}
            size="sm"
          />
        </div>
      </div>
    </>
  );
}
