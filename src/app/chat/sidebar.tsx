import { Box, IconButton, Button } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  return (
    <Box className="p-[5px] fixed left-0 top-0 flex h-full w-[7vh] min-w-[80px] flex-col items-center bg-darker-blue">
      <IconButton className="mt-[1.5rem] text-white">
        <MenuIcon />
      </IconButton>
      <Box className="mt-[10vh] flex h-full w-full flex-col items-center gap-[1rem]">
        <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue">
          <GroupsIcon />
        </IconButton>
        <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue">
          <ChatIcon />
        </IconButton>
        <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue">
          <EventNoteIcon />
        </IconButton>
        <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue">
          <StarsIcon />
        </IconButton>
      </Box>
      <IconButton className="mb-[1rem] text-white">
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}
