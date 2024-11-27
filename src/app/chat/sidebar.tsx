import { Box, IconButton } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { Panel } from "./panelEnum";
import SidePanel from "./side-panel";

interface SidebarProps {
  handleToggleIsNewMotion: () => void;
  setReloadChatBox: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  handleToggleIsNewMotion,
  setReloadChatBox,
}: SidebarProps) {
  /* tracks panel version for changing panel layout */
  const [panelVersion, setPanelVersion] = useState(Panel.COMMITTEES);

  /**
   * Function adjusts panel version const based on button pressed
   * @param event user clicking the sidebar buttons
   */
  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    const buttonId = event.currentTarget.id;
    switch (buttonId) {
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
    <Box className="container-sidebar-panel relative left-0 top-[80px] flex h-[calc(100vh-80px)] w-[35vw] min-w-[12rem] flex-row items-center">
      <Box className="sidebar relative left-0 flex h-full w-[60px] flex-col items-center bg-light-primary p-[5px] dark:bg-black">
        <Box className="sidebar-button-container mt-[10vh] flex h-auto w-full flex-grow flex-col items-center gap-y-3">
          <IconButton
            id="sidebar-button-committee"
            className="aspect-square w-3/4 rounded-xl bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text"
            onClick={handleButtonClick}
          >
            <GroupsIcon />
          </IconButton>
          <IconButton
            id="sidebar-button-motion"
            className="aspect-square w-3/4 rounded-xl bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text"
            onClick={handleButtonClick}
          >
            <ChatIcon />
          </IconButton>
          <IconButton
            id="sidebar-button-agenda"
            className="aspect-square w-3/4 rounded-xl bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text"
            onClick={handleButtonClick}
          >
            <EventNoteIcon />
          </IconButton>
          <IconButton
            id="sidebar-button-role"
            className="aspect-square w-3/4 rounded-xl bg-white text-light-primary dark:bg-dark-secondary dark:text-dark-text"
            onClick={handleButtonClick}
          >
            <StarsIcon />
          </IconButton>
        </Box>
        <Box className="mb-2 flex h-auto w-full flex-1 flex-col items-center justify-end">
          <IconButton className="text-light-background">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      <SidePanel
        panelVersion={panelVersion}
        handleToggleIsNewMotion={handleToggleIsNewMotion}
        setReloadChatBox={setReloadChatBox}
      />
    </Box>
  );
}
