// src/chat/ChatBox.tsx
"use client";

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]);
      setCurrentMessage(''); // Clear input after sending
    }
  };

  return (
    <Box className="flex flex-col h-full bg-gray-200 p-4">
      {/* Display messages */}
      <Box className="flex-grow overflow-y-auto bg-white p-4 mb-2">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <Box key={index} className="p-2 bg-blue-500 text-white rounded mb-2">
              {message}
            </Box>
          ))
        )}
      </Box>

      {/* Input area */}
      <Box className="flex">
        <TextField
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-grow mr-2"
          placeholder="Type a message..."
          variant="outlined"
          size="small"
        />
        <Button onClick={sendMessage} variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
