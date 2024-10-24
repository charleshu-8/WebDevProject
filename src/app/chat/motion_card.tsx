import {Box, Avatar} from '@mui/material';
import { blue, green, purple, red } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
<<<<<<< HEAD
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
=======
>>>>>>> 9418a63 (initial motion card implementation)

export default function Motion_Card() {

  return (
<<<<<<< HEAD
    <Box className="h-[140px] flex flex-col bg-white justify-center gap-y-[5px] py-[5px] px-[5px] border border-gray-300 rounded-[5px]">
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-end">
=======
    <Box className="w-[168px] h-[140px] flex flex-col justify-center bg-white gap-y-[5px] py-[5px] px-[5px] border border-gray-300 rounded-[5px] absolute bottom-10">
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-center">
>>>>>>> 9418a63 (initial motion card implementation)
            <h1 className="font-roboto text-[12px] font-bold text-black">
                Motion: Title
            </h1>
            <h1 className="font-roboto text-[10px] text-black">
                Status: Active
            </h1>
        </Box>
<<<<<<< HEAD
        <Box className="w-full h-[20px] flex flex-row justify-start items-center gap-x-3">
            <Box className="flex flex-row items-center gap-x-1">
=======
        <Box className="w-full h-[20px] flex flex-row justify-start gap-x-3 items-center">
            <Box className="w-fit h-[20px] flex flex-row items-center gap-x-1">
>>>>>>> 9418a63 (initial motion card implementation)
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
<<<<<<< HEAD
            <h1 className="w-fit h-fit font-roboto text-[10px] text-black text-center px-[5px] py-[1px] rounded-full bg-gray-300">
=======
            <h1 className="font-roboto text-[10px] text-black text-center px-[5px] w-fit rounded-full bg-gray-300">
>>>>>>> 9418a63 (initial motion card implementation)
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
<<<<<<< HEAD
                {/* for closed motion */}
                {/* <Box className="font-roboto text-[10px] text-black px-[5px] py-[2px] flex flex-row items-center gap-x-1 rounded-full border border-gray-300">
                    <CheckIcon sx={{color: green[500], width: 15, height: 15}}/>
                    4
                </Box> */}
                {/* <Box className="font-roboto text-[10px] text-black px-[5px] py-[2px] flex flex-row items-center gap-x-1 rounded-full border border-gray-300">
                    <CloseIcon sx={{color: red[500], width: 15, height: 15}}/>
                    2
                </Box> */}
=======
>>>>>>> 9418a63 (initial motion card implementation)
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
