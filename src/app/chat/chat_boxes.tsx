// src/chat/ChatBox.tsx
"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatInputField from "./chat_input_form";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setCurrentMessage] = useState<string>("");

  const sendMessage = (message: string) => {
    if (message.trim()) {
      setMessages([...messages, message]);
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
            <Box
              key={index}
              className="mb-2 flex items-end justify-end" // Right-align messages
            >
              <Box className="flex items-center space-x-2">
                {/* Message bubble with wider max width */}
                <Box className="rounded bg-blue-500 p-2 text-white max-w-md">
                  {message}
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
