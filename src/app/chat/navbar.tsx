import { Button, Box, Menu, MenuItem} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { currentUser } from "@/app/db/pocketbase";
import { useEffect, useState} from "react";
import useOutsideClick from '../utils/outside-click';
import { logout } from "../db/authentication";
import Link from "next/link";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("Guest");
  // callback w custom hook to close menu
  const menuRef = useOutsideClick(() => setOpen(false));

  useEffect(() => {
    if (currentUser && user === "Guest") {
      setUser(currentUser.username);
    }
  }, [user]);


  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  const handleLogoutClick = () => {
    setOpen(false);
    logout();
    console.log(`current user: ${currentUser}`)
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
          ref={menuRef}
          onClick={handleProfileClick}>
            <PersonOutlineIcon />
            <span className="text-sm">{user}</span>
          </Button>
          {open && (<Menu
          id="profile-button-menu"
          open={open}
          anchorEl={anchorEl}
          >
            <Link href={'/'}>
              <MenuItem className="text-sm flex justify-center text-light-primary" onClick={handleLogoutClick}>Logout</MenuItem>
            </Link>
            
          </Menu>)}
          
      </Box>
    </Box>
  );
}
