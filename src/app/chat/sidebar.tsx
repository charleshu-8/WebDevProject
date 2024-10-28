import { Box, IconButton } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState, memo, useEffect } from 'react';
import {Panel} from './panel';
import SidePanel from './sidepanel';


export default function SideBar () {

    /* tracks panel version for changing panel layout */
  const [panelVersion, setPanelVersion] = useState(Panel.COMMITTEES);

  /**
   * Function adjusts panel version const based on button pressed
   * @param event user clicking the sidebar buttons
   */
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    switch (buttonId){
      case "sidebar-button-committee":
        setPanelVersion(Panel.COMMITTEES);
        console.log("committee panel chosen!");
        break;
      case "sidebar-button-motion":
        setPanelVersion(Panel.MOTIONS);
        console.log("motion panel chosen!");
        break;
      case "sidebar-button-agenda":
        setPanelVersion(Panel.AGENDA);
        console.log("agenda panel chosen!");
        break;
      case "sidebar-button-role":
        setPanelVersion(Panel.ROLES);
        console.log("role panel chosen!");
        break;
    }
  }

  return (
    <Box className="container-sidebar-panel relative h-[calc(100vh-80px)] w-[35vw] min-w-[12rem] left-0 top-[80px] flex flex-row items-center">
      <Box className="sidebar bg-light-primary relative left-0 p-[5px] h-full w-[60px] flex flex-col items-center dark:bg-black">
        <Box className="sidebar-button-container mt-[10vh] flex flex-grow w-full h-auto flex-col items-center gap-y-3">
          <IconButton id="sidebar-button-committee" className="bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl" onClick={handleButtonClick}>
            <GroupsIcon />
          </IconButton>
          <IconButton id="sidebar-button-motion"className="bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl" onClick={handleButtonClick}>
            <ChatIcon />
          </IconButton>
          <IconButton id="sidebar-button-agenda" className="bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl" onClick={handleButtonClick}>
            <EventNoteIcon />
          </IconButton>
          <IconButton id="sidebar-button-role" className="bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl" onClick={handleButtonClick}>
            <StarsIcon />
          </IconButton>
        </Box>
        <Box className="flex h-auto w-full flex-1 flex-col items-center justify-end mb-2">
          <IconButton className="text-light-background">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      <SidePanel panelVersion={panelVersion}/>
    </Box>
  );
}
