"use client";

import React, { useLayoutEffect, useState } from "react";
import NavBar from "./navbar";
import Sidebar from "./sidebar";
import ChatBox from "./motions/chat-box";
import MakeCommitteeForm from "./committees/make-committee-form";
import {
  currentUser,
  getCurrentCommittee,
  getCurrentMotion,
} from "../db/pocketbase";
import { redirect } from "next/navigation";

export default function ChatPage() {
  // State to track whether the input is for a new motion
  const [isNewMotion, toggleIsNewMotion] = useState(false);
  const [isInputHidden, toggleIsInputHidden] = useState(true);
  const [isMakeCommittee, toggleIsMakeCommittee] = useState(false);
  // State to track whether the chat box should be reloaded
  const [reloadChatBox, setReloadChatBox] = useState(false);

  // Toggle the isNewMotion state
  function handleToggleIsNewMotion(): void {
    toggleIsNewMotion(!isNewMotion);
  }

  // Toggel the isInputHidden state
  function handleToggleIsInputHidden(value: boolean): void {
    toggleIsInputHidden(value);
  }

  // Toggle the isMakeCommittee state to display the committee form
  function handleToggleMakeCommittee(value: boolean): void {
    toggleIsMakeCommittee(value);
  }

  // Redirects user to landing page if not logged in
  useLayoutEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  });

  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <Sidebar
        handleToggleIsNewMotion={handleToggleIsNewMotion}
        handleToggleIsInputHidden={handleToggleIsInputHidden}
        handleToggleMakeCommittee={handleToggleMakeCommittee}
        isMakeCommittee={isMakeCommittee}
        setReloadChatBox={setReloadChatBox}
      />
      <div className="relative top-[80px] flex h-[calc(100%-80px)] w-full flex-row">
        <NavBar />
        {isMakeCommittee ? (
          <MakeCommitteeForm
            handleToggleMakeCommittee={handleToggleMakeCommittee}
          />
        ) : (
          <ChatBox
            isNewMotion={isNewMotion}
            isInputHidden={isInputHidden}
            reload={reloadChatBox} // Pass the reload state as a prop
            setReload={setReloadChatBox} // Pass the setReload state as a prop
            handleToggleIsNewMotion={handleToggleIsNewMotion}
          />
        )}
      </div>
    </div>
  );
}
