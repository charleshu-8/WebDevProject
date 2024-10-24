import SideBar from "./navbar";
import NavBar from "./sidebar";
import SidePanel from "./sidepanel";
import {Box} from "@mui/material";
import React, { useState } from 'react';
import './panel.';

export default function ChatPage() {

  //const [panelVersion, setPanelVersion] = useState(Panel);



  return (
    <Box className="bg-stark-white h-screen w-screen flex">
      <Box className="flex flex-col h-full w-full">
        <NavBar/>
        <Box id="chat-horizontal-container" className="flex flex-row flex-grow w-screen h-auto">
          <SideBar/>
          <SidePanel version={Panel.COMMITTEES}/>
          <Box className="flex-grow">{/*discussion forum will go here*/}</Box>

        </Box>

      </Box>
    </Box>
    

    // then add control panel

    //then have chat page content dispalyed here and switched out
    // depending on chat chosen
  );
}
