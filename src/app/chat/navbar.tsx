import { Button, Box} from '@mui/material';

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function NavBar() {
  const user = "First Name Last Name";
  return (
    <Box className="sticky flex h-[6vw] min-h-[80px] w-screen flex-row bg-darker-blue p-2">
      <Box className="ml-[100px] flex h-full w-2/5 items-center">
        <h1 className="font-roboto text-[2em] font-bold text-white">
          Team Slackers
        </h1>
      </Box>
      <Box className="flex h-full w-3/5 items-center justify-end">
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
