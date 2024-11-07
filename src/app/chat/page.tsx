"use client";

import SideBar from "./navbar";
import NavBar from "./sidebar";
import ChatBox from "./chat_boxes";

export default function ChatPage() {
  return (
    <div className="flex h-screen w-screen bg-light-background dark:bg-dark-secondary">
      <NavBar />
      <div className="relative top-[80px] flex h-[calc(100%-80px)] w-full flex-row">
        <SideBar />
        <ChatBox />
      </div>
    </div>
  );
}
