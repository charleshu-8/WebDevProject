"use client";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import {Box} from "@mui/material";
import ChatInputField from "./chat_input_form";
import {useState} from 'react';
import MotionInputField from "./motion_input_form";
import SidePanel from './sidepanel';

export default function ChatPage() {
  const [motionAdded, setMotionAdded] = useState(false);

  return (
    <Box className="bg-light-background dark:bg-dark-secondary h-screen w-screen flex">
      <NavBar/>
      <Box id="chat-horizontal-container" className="relative top-[80px] flex flex-row w-screen h-[calc(100%-80px)]">
        <SideBar updateInputField={setMotionAdded}/>
        <Box className="discussion-content relative flex justify-center w-full min-w-[65vw] h-full">
          {/*everything in discussion forum will go below here*/}
          <Box className="absolute bottom-0 w-[80%] h-auto p-4 m-2 rounded-md">
            {motionAdded ? <MotionInputField updateInputField={setMotionAdded}/> : <ChatInputField/>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}