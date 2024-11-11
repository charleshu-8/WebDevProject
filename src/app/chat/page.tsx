"use client";

import React, { useState } from "react";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import ChatBox from "./chat-box";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(true);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <NavBar />
      <div className="relative top-[80px] flex h-[calc(100%-80px)] w-full flex-row">
        <SideBar />
        <ChatBox isNewMotion={isNewMotion} />
      </div>
    </div>
  );
}