import { Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { currentUser } from "/src/app/pocketbase.ts";
import { useState } from "react";

export default function NavBar() {

  /**
   * will have this be modular once user auth is merged
   */
  //const user = currentUser?.username || "Guest";
  const [user, setUser] = useState("Guest");
  if(currentUser && user === "Guest") {
    setUser(currentUser.username);
  }

  return (
    <Box className="bg-light-primary dark:bg-dark-background fixed left-0 top-0 flex h-[80px] w-full flex-row p-2">
      <IconButton className="text-light-background ml-[8px]">
        <MenuIcon />
      </IconButton>
      <Box className="ml-[50px] flex h-full w-1/5 items-center md:ml-[100px] md:w-2/5">
        <h1 className="text-light-background text-[2em]">Team Slackers</h1>
      </Box>
      <Box className="ml-[70px] flex h-full w-3/5 items-center justify-end">
        <Button className="bg-light-background text-light-primary dark:bg-dark-secondary dark:text-dark-text mr-[1rem] flex h-auto w-auto flex-row items-center rounded-[5rem] gap-x-2 pl-2 pr-2">
          <PersonOutlineIcon />
          <span className="text-sm">{user}</span>
        </Button>
      </Box>
    </Box>
  );
}
