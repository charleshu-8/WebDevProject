import { Box, IconButton } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarsIcon from "@mui/icons-material/Stars";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  return (
    <Box className="bg-light-primary fixed left-0 top-[80px] flex h-full w-[70px] flex-col items-center p-[5px] dark:bg-black">
      <Box className="mt-[10vh] flex h-auto w-full flex-grow flex-col items-center gap-[1rem]">
        <IconButton className="bg-light-background text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl">
          <GroupsIcon />
        </IconButton>
        <IconButton className="bg-light-background text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl">
          <ChatIcon />
        </IconButton>
        <IconButton className="bg-light-background text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl">
          <EventNoteIcon />
        </IconButton>
        <IconButton className="bg-light-background text-light-primary dark:bg-dark-secondary dark:text-dark-text aspect-square w-3/4 rounded-xl">
          <StarsIcon />
        </IconButton>
      </Box>
      <Box className="flex h-auto w-full flex-1 flex-col items-center justify-end">
        <IconButton className="text-light-background mb-[6rem]">
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
