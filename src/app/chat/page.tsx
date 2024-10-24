// src/app/chat/page.tsx
import React from 'react';
import ChatBox from './ChatBox';
import { Box } from '@mui/material';

const ChatPage: React.FC = () => {
  return (
    <Box className="bg-gray-100 h-screen">
      <ChatBox />
    </Box>
  );
};

export default ChatPage;