// src/chat/ChatBox.tsx
"use client";

import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import ChatInputField from "./chat_input_form";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { sender: "User", text: currentMessage }]);
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
            <Box key={index} className="mb-2 flex items-center">
              <Box className="mr-2 rounded bg-gray-300 p-1 text-black">
                {message.sender}
              </Box>
              <Box className="rounded bg-blue-500 p-2 text-white">
                {message.text}
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Box className="flex">
          <TextField
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-grow mr-2"
            placeholder="Type a message..."
            variant="outlined"
            size="small"
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChatBox;
