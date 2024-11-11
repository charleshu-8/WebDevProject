"use client";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import { Box } from "@mui/material";
import ChatBox from "./chat_boxes";
import { useEffect } from "react";
import { pb, currentUser } from "/src/app/pocketbase";

let messages = [];

export default function ChatPage() {
  return (
    <Box className="h-screen w-screen bg-light-background">
      <NavBar />
      <SideBar />
      <div className="fixed left-[70px] top-[80px] flex h-[89%] w-[93%]">
        <ChatBox />
      </div>
    </Box>
  );
}
