"use client";

import React, { useLayoutEffect, useState } from "react";
import NavBar from "./navbar";
import Sidebar from "./sidebar";
import ChatBox from "./motions/chat-box";
import { currentUser } from "../db/pocketbase";
import { redirect } from "next/navigation";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(false);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  // Redirects user to landing page if not logged in
  useLayoutEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  });

  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <Sidebar handleToggleIsNewMotion={handleToggleIsNewMotion} />
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
