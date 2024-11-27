"use client";

import React, { useState } from "react";
import NavBar from "./navbar";
import Sidebar from "./sidebar";
import ChatBox from "./motions/chat-box";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(false);
  // State to track whether the chat box should be reloaded
  const [reloadChatBox, setReloadChatBox] = useState(false);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <Sidebar
        handleToggleIsNewMotion={handleToggleIsNewMotion}
        setReloadChatBox={setReloadChatBox}
      />
      <div className="relative top-[80px] flex h-[calc(100%-80px)] w-full flex-row">
        <NavBar />
        <ChatBox
          isNewMotion={isNewMotion}
          handleToggleIsNewMotion={handleToggleIsNewMotion}
          reload={reloadChatBox} // Pass the reload state as a prop
          setReload={setReloadChatBox} // Pass the setReload state as a prop
        />
      </div>
    </div>
  );
}
