// src/chat/ChatBox.tsx
"use client";

import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import ChatInputField from "./chat_input_form";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]);
      setCurrentMessage(""); // Clear input after sending
    }
  };

  const [message, setMessage] = useState("");
  const handleSendMessage = (text: string) => {
    console.log("Message sent:", text);
    setMessage(text);
    // You can add additional logic here, such as sending the message to a server
  };

  return (
    <Box className="flex h-full flex-col bg-gray-200 p-4">
      {/* Display messages */}
      <Box className="mb-2 flex-grow overflow-y-auto bg-white p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              className="mb-2 rounded bg-blue-500 p-2 text-white"
            >
              {message}
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
          <ChatInputField onSendMessage={handleSendMessage} />
        </Box>
      </form>
    </Box>
  );
};

export default ChatBox;
