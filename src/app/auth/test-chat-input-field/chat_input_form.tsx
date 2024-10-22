"use client";
import React, { useState } from "react";
import heart from "../../res/heart.svg"; // Import the default heart icon
import pressedHeart from "../../res/pressed_heart.svg"; // Import the pressed heart icon
import pro from "../../res/pro.svg"; // Import the pro icon
import pressedPro from "../../res/pressed_pro.svg"; // Import the pressed pro icon
import con from "../../res/con.svg"; // Import the con icon
import pressedCon from "../../res/pressed_con.svg"; // Import the pressed con icon
import neutral from "../../res/neutral.svg"; // Import the neutral icon
import pressedNeutral from "../../res/pressed_neutral.svg"; // Import the pressed neutral icon
import send from "../../res/send.svg"; // Import the send icon
import Textarea from "@mui/joy/Textarea"; // Import the Input component from the MUI Joy library

// Form component for requesting email for password recovery
export default function ChatInputField() {
  // State to track whether the icon is pressed
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const [isProPressed, setIsProPressed] = useState(false);
  const [isConPressed, setIsConPressed] = useState(false);
  const [isNeutralPressed, setIsNeutralPressed] = useState(false);

  // Toggle the heart button state
  const handleHeartClick = () => {
    setIsHeartPressed(!isHeartPressed);
  };

  // Toggle the pro button state
  const handleProClick = () => {
    setIsProPressed(!isProPressed);
    setIsConPressed(false); // Ensure that the con button is not pressed
    setIsNeutralPressed(false); // Ensure that the neutral button is not pressed
  };

  // Toggle the con button state
  const handleConClick = () => {
    setIsConPressed(!isConPressed);
    setIsProPressed(false); // Ensure that the pro button is not pressed
    setIsNeutralPressed(false); // Ensure that the neutral button is not pressed
  };

  // Toggle the neutral button state
  const handleNeutralClick = () => {
    setIsNeutralPressed(!isNeutralPressed);
    setIsProPressed(false); // Ensure that the pro button is not pressed
    setIsConPressed(false); // Ensure that the con button is not pressed
  };

  // Hand send button click
  const handleSendClick = () => {
    // TODO: Add logic to send the message
  };

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
          {/* Heart Button/Icon */}
          <img
            alt="Heart"
            style={{
              height: "80%",
              cursor: "pointer",
              marginRight: "10px",
            }}
            src={isHeartPressed ? pressedHeart.src : heart.src} // Conditionally render the icon
            onClick={handleHeartClick} // Handle icon click
          />
          {/* Pro Button/Icon */}
          <img
            alt="Pro"
            style={{
              height: "70%",
              cursor: "pointer",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            src={isProPressed ? pressedPro.src : pro.src} // Conditionally render the icon
            onClick={handleProClick} // Handle icon click
          />
          {/* Con Button/Icon */}
          <img
            alt="Con"
            style={{
              height: "70%",
              cursor: "pointer",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            src={isConPressed ? pressedCon.src : con.src} // Conditionally render the icon
            onClick={handleConClick} // Handle icon click
          />
          {/* Neutral Button/Icon */}
          <img
            alt="Neutral"
            style={{
              height: "70%",
              cursor: "pointer",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            src={isNeutralPressed ? pressedNeutral.src : neutral.src} // Conditionally render the icon
            onClick={handleNeutralClick} // Handle icon click
          />
        </div>
        {/* 'Motion:' Declaration Text with Send Button */}
        <div className="ml-7 mr-7 mt-4 flex items-center justify-between">
          <p className="text-xl font-semibold">Motion:</p>
          <img
            alt="Send"
            style={{
              height: "10%",
              cursor: "pointer",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            src={send.src} // Conditionally render the icon
            onClick={handleSendClick} // Handle icon click
          />
        </div>
        {/* MUI Input Component Container*/}
        <div className="ml-7 mr-7 mt-2">
          <Textarea
            name="Textarea"
            placeholder="I move that…"
            variant="outlined"
            minRows={3}
            maxRows={3}
            size="lg"
          />
        </div>
      </div>
    </>
  );
}
