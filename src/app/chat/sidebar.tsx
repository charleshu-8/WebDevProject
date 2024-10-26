import { Box, IconButton } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar () {
   
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    switch (buttonId){
      case "sidebar-button-committee":
        console.log("committee");
        break;
      case "sidebar-button-motion":
        console.log("motion");
        break;
    }
  }

  return (
    <Box className="relative left-0 top-[80px] p-[5px] h-full w-[70px] flex flex-col items-center bg-light-primary">
      <Box className="mt-[10vh] flex flex-grow w-full h-auto flex-col items-center gap-[1rem]">
        <IconButton id="sidebar-button-committee" className="aspect-square w-3/4 rounded-xl bg-white text-light-primary" onClick={handleButtonClick}>
          <GroupsIcon />
        </IconButton>
        <IconButton id="sidebar-button-motion"className="aspect-square w-3/4 rounded-xl bg-white text-light-primary" onClick={handleButtonClick}>
          <ChatIcon />
        </IconButton>
        <IconButton id="sidebar-button-agenda" className="aspect-square w-3/4 rounded-xl bg-white text-light-primary" onClick={handleButtonClick}>
          <EventNoteIcon />
        </IconButton>
        <IconButton id="sidebar-button-role" className="aspect-square w-3/4 rounded-xl bg-white text-light-primary" onClick={handleButtonClick}>
          <StarsIcon />
        </IconButton>
      </Box>
      <Box className="flex h-auto w-full flex-1 flex-col items-center justify-end">
        <IconButton className="mb-[6rem] text-light-background">
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
