"use client";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import { Box } from "@mui/material";
import ChatBox from "./chat_boxes";


export default function ChatPage() {

  return (
    <Box className="bg-light-background dark:bg-dark-secondary h-screen w-screen flex">
      <NavBar/>
      <Box id="chat-horizontal-container" className="relative top-[80px] flex flex-row w-screen h-[calc(100%-80px)]">
        <SideBar/>
        <Box className="discussion-content relative flex justify-center w-full min-w-[65vw] h-full">
          {/*everything in discussion forum will go below here*/}
          <Box className="absolute bottom-0 w-[80%] h-auto p-4 m-2 rounded-md">
            <ChatBox/>
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}