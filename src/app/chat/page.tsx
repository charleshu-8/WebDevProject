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
    <Box className="bg-stark-white h-screen w-screen flex">
      <Box className="flex h-full w-full flex-col">
        <NavBar/>
        <Box id="chat-horizontal-container" className="flex flex-grow w-screen h-auto flex-row">
          <SideBar/>
          <SidePanel version={Panel.COMMITTEES} />
          <Box className="relative flex justify-center flex-grow w-full h-full">{/*discussion forum will go here*/}
            <Box className="absolute bottom-0 w-[80%] h-auto bg-darker-blue p-4 m-2">
              <ChatInputField/>
            </Box>
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