"use client";
import React, { useState } from "react";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import { Box } from "@mui/material";
import ChatBox from "./chat_boxes";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(true);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  return (
    <Box className="h-screen w-screen bg-light-background">
      <NavBar />
      <SideBar />
      <div className="fixed left-[70px] top-[80px] flex h-[89%] w-[93%]">
        <ChatBox isNewMotion={isNewMotion} />
      </div>
    </Box>
  );
}
