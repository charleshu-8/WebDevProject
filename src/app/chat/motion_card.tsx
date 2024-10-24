import {Box, Avatar} from '@mui/material';
import { blue, green, purple, red } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Motion_Card() {

  return (
    <Box className="w-[168px] h-[140px] flex flex-col justify-center bg-white gap-y-[5px] py-[5px] px-[5px] border border-gray-300 rounded-[5px] absolute bottom-10">
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-center">
            <h1 className="font-roboto text-[12px] font-bold text-black">
                Motion: Title
            </h1>
            <h1 className="font-roboto text-[10px] text-black">
                Status: Active
            </h1>
        </Box>
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-center">
            <Box className="w-fit h-[20px] flex flex-row items-center gap-x-1">
                <Avatar sx={{bgcolor: blue[500], width: 20, height: 20, fontSize: 10 }}>JS</Avatar>
                <h1 className="font-roboto text-[10px] font-bold text-black">
                    Person 1
                </h1>
            </Box>
            <h1 className="font-roboto text-[10px] text-black">
                moves that...
            </h1>
        </Box>
        <Box className="w-full h-[20px] flex flex-row justify-center items-center">
            <h1 className="font-roboto text-[10px] text-black text-center px-[5px] w-fit rounded-full bg-gray-300">
                It should be illegal to do xyz...
            </h1>
        </Box>
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-center">
            <h1 className="font-roboto text-[10px] text-black">
                Seconded:
            </h1>
            <Box className="w-fit h-[20px] flex flex-row items-center gap-x-1">
                <Avatar sx={{bgcolor: purple[500], width: 20, height: 20, fontSize: 10 }}>ML</Avatar>
                <h1 className="font-roboto text-[10px] font-bold text-black">
                    Person 2
                </h1>
            </Box>
        </Box>
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-center">
            <h1 className="font-roboto text-[10px] text-black">
                Vote:
            </h1>
            <Box className="w-fit h-[20px] flex flex-row items-center gap-x-1">
                <CheckCircleOutlineIcon sx={{color: green[500], width: 20, height: 20}}/>
                <HighlightOffIcon sx={{color: red[500], width: 20, height: 20}}/>
            </Box>
        </Box>
        <Box className="w-full h-[10px] flex flex-row justify-end">
            <h1 className="font-roboto text-[8px] text-black">
                Time: 12:30pm
            </h1>
        </Box>
    </Box>
  );
}
