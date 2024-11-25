"use client";

import React, { useState } from "react";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import ChatBox from "./motions/chat-box";
import MakeCommitteeForm from "./committees/make-committee-form";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(true);
  const [isMakeCommittee, toggleIsMakeCommittee] = useState(false);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  // Toggle the isMakeCommittee state to display the committee form
  function handleToggleMakeCommittee(value: boolean): void {
    toggleIsMakeCommittee(value);
    console.log("Toggling make committee");
  }

  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <SideBar />
      <div className="relative top-[80px] flex h-[calc(100%-80px)] w-full flex-row">
      <NavBar handleToggleMakeCommittee={handleToggleMakeCommittee} isMakeCommittee={isMakeCommittee}/>
        
          {isMakeCommittee ? (
              <MakeCommitteeForm handleToggleMakeCommittee={handleToggleMakeCommittee}/>
            ) : (
              <ChatBox isNewMotion={isNewMotion} />
            )}
          
        {/* <ChatBox isNewMotion={isNewMotion} />*/}
        
      </div>
    </div>
  );
}
