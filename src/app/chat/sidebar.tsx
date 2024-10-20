import { Box, IconButton, Button } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  return (
    <Box className="fixed left-0 top-[80px] p-[5px] h-full w-[70px] flex flex-col items-center bg-darker-blue">
      <Box className="mt-[10vh] flex flex-grow w-full h-auto flex-col items-center gap-[1rem]">
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
      <Box className="flex flex-1 flex-col h-auto w-full items-center justify-end">
        <IconButton className="text-white mb-[6rem]">
            <SettingsIcon />
        </IconButton>

      </Box>
    </Box>
  );
}
