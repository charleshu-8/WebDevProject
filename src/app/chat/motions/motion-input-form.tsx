"use client";

import React, { useState } from "react";
import Textarea from "@mui/joy/Textarea"; // Import the Input component from the MUI Joy library

interface MotionInputFieldProps {
  onSendMessage: (message: string) => void;
}

// Form component for requesting email for password recovery
export default function MotionInputField({
  onSendMessage,
}: MotionInputFieldProps) {
  // State to track the message input
  const [message, setMessage] = useState("");

  // Hand send button click
  function handleSendClick(): void {
    onSendMessage(message);
    setMessage(""); // Clear the text area after sending the message
  }

  return (
    <>
      {/* Main White Chat Field Input Box Container */}
      <div className="h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white">
        {/* 'Motion:' Declaration Text with Send Button */}
        <div className="ml-7 mr-7 mt-4 flex h-1/5 items-center justify-between">
          {/* Motion Text */}
          <p className="text-xl font-semibold text-black dark:text-black">
            Adding New Motion:
          </p>
          {/* Send Button/Icon Container*/}
          {/* Send Button/Icon */}
          <div className="ml-2 mr-2 flex h-[95%] cursor-pointer items-center">
            <img
              className="h-full"
              alt="Send"
              src={"img/chat/send_icon.svg"} // Conditionally render the icon
              onClick={handleSendClick}
            />
          </div>
        </div>
        {/* MUI Input Component Container*/}
        <div className="mb-6 ml-7 mr-7 mt-2">
          <Textarea
            name="Textarea"
            placeholder="I move that…"
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
      </div>
    </>
  );
}
