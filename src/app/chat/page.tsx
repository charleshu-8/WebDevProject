"use client";

import React, { useState } from "react";
import NavBar from "./navbar";
import Sidebar from "./sidebar";
import ChatBox from "./motions/chat-box";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(false);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <Sidebar
        isNewMotion={isNewMotion}
        handleToggleIsNewMotion={handleToggleIsNewMotion}
      />
      <div className="relative top-[80px] flex h-[calc(100%-80px)] w-full flex-row">
        <NavBar />
        <ChatBox
          isNewMotion={isNewMotion}
          handleToggleIsNewMotion={handleToggleIsNewMotion}
        />
      </div>
    </div>
  );
}
