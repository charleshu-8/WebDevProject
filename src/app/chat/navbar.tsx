import { Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function NavBar() {
  const user = "First Name Last Name";

  return (
    <Box className="fixed left-0 top-0 flex h-[80px] w-full flex-row bg-light-primary p-2">
      <IconButton className="ml-2 text-light-background">
        <MenuIcon />
      </IconButton>
      <Box className="ml-[50px] flex h-full w-1/5 items-center md:ml-[100px] md:w-2/5">
        <h1 className="text-[2em] text-light-background">Team Slackers</h1>
      </Box>
      <Box className="ml-[70px] flex h-full w-3/5 items-center justify-end">
        <Button className="mr-[1rem] flex h-auto w-auto flex-row items-center gap-[1rem] rounded-[5rem] bg-light-background text-light-primary">
          <span className="flex items-center gap-x-2 pl-2 pr-2">
            <PersonOutlineIcon />
            <p>{user}</p>
          </span>
        </Button>
      </Box>
    </Box>
  );
}
