import { Button, Box } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { currentUser } from "@/app/db/pocketbase";
import { useEffect, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar() {
  const [user, setUser] = useState("Guest");

  useEffect(() => {
    if (currentUser && user === "Guest") {
      setUser(currentUser.username);
    }
  }, [user]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () =>{
    setAnchorEl(null);
  }

  return (
    <Box className="fixed left-0 top-0 flex h-[80px] w-full flex-row bg-light-primary p-2 dark:bg-dark-background">
      <Box className="ml-[50px] flex h-full w-1/5 items-center md:ml-[100px] md:w-2/5">
        <h1 className="text-[2em] text-light-background">Team Slackers</h1>
      </Box>
      <Box className="ml-[70px] flex h-full w-3/5 items-center justify-end">
          <Button className="mr-[1rem] flex h-auto w-auto flex-row items-center gap-x-2 rounded-[5rem] bg-light-background pl-2 pr-2 text-light-primary dark:bg-dark-secondary dark:text-dark-text"
          aria-controls={open ? 'profile-button-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleProfileClick}>
            <PersonOutlineIcon />
            <span className="text-sm">{user}</span>
          </Button>
          <Menu
          id="profile-button-menu"
          open={open}
          anchorEl={anchorEl}

          >
            <MenuItem className="text-sm flex justify-center text-light-primary" onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
      </Box>
    </Box>
  );
}
