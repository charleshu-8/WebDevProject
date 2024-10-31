// src/chat/ChatBox.tsx
"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatInputField from "./chat_input_form";

// Helper function to get the current time in {HH:MM} format
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const ChatBox: React.FC = () => {
  // State to store messages as objects with text and timestamp
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);
  const [message, setCurrentMessage] = useState<string>("");

  const sendMessage = (message: string) => {
    if (message.trim()) {
      // Add message along with timestamp
      setMessages([...messages, { text: message, timestamp: getCurrentTime() }]);
      setCurrentMessage(""); // Clear input after sending
    }
  };

  return (
    <Box className="flex h-full w-full flex-col bg-gray-200 p-4">
      {/* Display messages */}
      <Box className="mb-2 flex-grow overflow-y-auto bg-white p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <Box key={index} className="mb-4 flex flex-col items-end">
              {/* Timestamp above the message */}
              <Typography
                variant="caption"
                className="text-gray-400"
              >
                {message.timestamp}
              </Typography>

              {/* Message bubble */}
              <Box className="flex items-center space-x-2">
                <Box className="rounded bg-blue-500 p-2 text-white max-w-md">
                  {message.text}
                </Box>

                {/* Circle Icon for Profile */}
                <Box
                  className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold"
                  aria-label="User Icon"
                >
                  U {/* Optional: Replace 'U' with initials or an emoji */}
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
        }}
      >
        <ChatInputField onSendMessage={sendMessage} />
      </form>
    </Box>
  );
};

export default ChatBox;