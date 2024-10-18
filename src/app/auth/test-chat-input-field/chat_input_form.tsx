"use client";
import React, { useState } from "react";
import icon from "../../res/heart.svg"; // Import the default heart icon
import pressedIcon from "../../res/pressed_heart.svg"; // Import the pressed heart icon

// Form component for requesting email for password recovery
export default function ChatInputField() {
  // State to track whether the icon is pressed
  const [isPressed, setIsPressed] = useState(false);

  // Toggle the icon state
  const handleIconClick = () => {
    setIsPressed(!isPressed);
  };

  return (
    <>
      {/* Main White Chat Field Input Box Container */}
      <div
        className="h-64 w-3/4 flex-col items-center justify-center rounded-lg bg-white"
        style={{ overflow: "hidden" }}
      >
        {/* Gray Options Bar above chat input field */}
        <div
          className="bg-gray-shadow flex h-1/5 items-center pl-6"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* SVG Icon */}
          <img
            alt="Icon"
            style={{
              height: "80%",
              cursor: "pointer",
            }}
            src={isPressed ? pressedIcon.src : icon.src} // Conditionally render the icon
            onClick={handleIconClick} // Handle icon click
          />
        </div>
      </div>
    </>
  );
}
