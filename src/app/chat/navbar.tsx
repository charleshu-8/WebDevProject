import { Button,IconButton, Box} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function NavBar() {
  const user = "First Name Last Name";
  return (
    <Box className="fixed top-0 left-0 flex h-[80px] w-full flex-row bg-darker-blue p-2">
      <IconButton className="text-white ml-2">
        <MenuIcon/>
      </IconButton>
      <Box className="ml-[100px] flex h-full w-2/5 items-center">
        <h1 className="font-roboto text-[2em] font-bold text-white">
          Team Slackers
        </h1>
      </Box>
      <Box className="flex h-full w-3/5 items-center ml-[70px] justify-end">
        <Button className="font-darker-blue mr-[1rem] flex h-auto w-auto flex-row items-center gap-[1rem] rounded-[5rem] bg-white">
          <Box className="text-sm text-darker-blue">
            <PersonOutlineIcon />
          </Box>

          <Box>
            <span className="font-darker-blue text-[0.75rem] text-darker-blue">
              {user}
            </span>
          </Box>
        </Button>
      </Box>
    </Box>
  );
}
