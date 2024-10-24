import { Box, IconButton } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  return (
    <Box className="fixed left-0 top-[80px] flex h-full w-[70px] flex-col items-center bg-light-primary p-[5px]">
      <Box className="mt-[10vh] flex h-auto w-full flex-grow flex-col items-center gap-[1rem]">
        <IconButton className="aspect-square w-3/4 rounded-xl bg-light-background text-light-primary">
          <GroupsIcon />
        </IconButton>
        <IconButton className="aspect-square w-3/4 rounded-xl bg-light-background text-light-primary">
          <ChatIcon />
        </IconButton>
        <IconButton className="aspect-square w-3/4 rounded-xl bg-light-background text-light-primary">
          <EventNoteIcon />
        </IconButton>
        <IconButton className="aspect-square w-3/4 rounded-xl bg-light-background text-light-primary">
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
