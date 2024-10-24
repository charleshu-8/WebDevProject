"use client";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import SidePanel from "./sidepanel";
import {Box} from "@mui/material";
import React, { useState } from 'react';
import {Panel} from './panel';
import ChatInputField from "./chat_input_form";

const ChatPage = () => {

  //const [panelVersion, setPanelVersion] = useState(undefined | Panel);

  return (
    <Box className="bg-light-background h-screen w-screen flex">
      <NavBar/>
      <Box id="chat-horizontal-container" className="relative top-[80px] flex flex-row w-screen h-auto mb-[80px]">
        <SideBar/>
        <SidePanel version={Panel.COMMITTEES} />
        <Box className="discussion-content relative flex justify-center flex-grow w-full min-w-[10rem] h-auto">
          {/*everything in discussion forum will go below here*/}
          <Box className="absolute bottom-0 w-[80%] h-auto bg-light-primary p-4 m-2 rounded-md">
            <ChatInputField/>
          </Box>
        </Box>
      </Box>
    </Box>

    // then add control panel

    //then have chat page content dispalyed here and switched out
    // depending on chat chosen
  );
}

export default ChatPage;