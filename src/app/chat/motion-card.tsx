import { useState } from "react";
import { Box, Avatar } from "@mui/material";
import { blue, green, purple, red } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function MotionCard() {
  const [isPro, setIsPro] = useState(false);
  const [isCon, setIsCon] = useState(false);

  const handleProClick = () => {
    setIsPro(!isPro);
    setIsCon(false);
  };

  const handleConClick = () => {
    setIsCon(!isCon);
    setIsPro(false);
  };

  const shortName: string = "JS";
  const fullName: string = "Person 1";
  const motionText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus fugiat quisquam quod ullam, voluptas hic voluptate repellat placeat ab ipsam, est iusto id tempore. Soluta deserunt blanditiis in quidem quia?";
  const seconderShortName: string = "ML";
  const seconderFullName: string = "Person 2";
  const time: string = "12:30pm";

  return (
    <Box className="flex h-[140px] flex-col justify-center gap-y-[5px] rounded-[5px] border border-gray-300 bg-white px-[5px] py-[75px]">
      <Box className="flex h-[20px] w-full flex-row items-end justify-start gap-x-3">
        <p className="text-[12px] font-bold text-black">Motion: Title</p>
        <p className="text-[10px] text-black">Status: Active</p>
      </Box>
      <Box className="flex h-[20px] w-full flex-row items-center justify-start gap-x-3">
        <Box className="flex flex-row items-center gap-x-1">
          <Avatar
            sx={{ bgcolor: blue[500], width: 20, height: 20, fontSize: 10 }}
          >
            {shortName}
          </Avatar>
          <p className="text-[10px] font-bold text-black">{fullName}</p>
        </Box>
        <p className="text-[10px] text-black">moves that...</p>
      </Box>
      <Box className="flex h-[20px] w-full justify-center">
        <Box className="flex h-[20px] w-[125px] flex-row items-center justify-start rounded-full bg-gray-300">
          <p className="truncate px-[5px] py-[1px] text-center text-[10px] text-black">
            {motionText}
          </p>
        </Box>
      </Box>
      <Box className="flex h-[20px] w-full flex-row items-center justify-start gap-x-3">
        <p className="text-[10px] text-black">Seconded:</p>
        <Box className="flex h-[20px] w-fit flex-row items-center gap-x-1">
          <Avatar
            sx={{ bgcolor: purple[500], width: 20, height: 20, fontSize: 10 }}
          >
            {seconderShortName}
          </Avatar>
          <p className="text-[10px] font-bold text-black">{seconderFullName}</p>
        </Box>
      </Box>
      <Box className="flex h-[20px] w-full flex-row items-center justify-start gap-x-3">
        <p className="text-[10px] text-black">Vote:</p>
        <Box className="flex h-[20px] w-fit flex-row items-center gap-x-1">
          <Box
            onClick={handleProClick}
            id="cancel"
            className="flex w-fit cursor-pointer items-center"
          >
            {isPro ? (
              <CheckCircleIcon
                sx={{ color: green[500], width: 20, height: 20 }}
              />
            ) : (
              <CheckCircleOutlineIcon
                sx={{ color: green[500], width: 20, height: 20 }}
              />
            )}
            {/* for closed motion */}
            {/* <Box className=" text-[10px] text-black px-[5px] py-[2px] flex flex-row items-center gap-x-1 rounded-full border border-gray-300">
                            <CheckIcon sx={{color: green[500], width: 15, height: 15}}/>
                            4
                        </Box> */}
          </Box>
          <Box
            onClick={handleConClick}
            className="flex w-fit cursor-pointer items-center"
          >
            {isCon ? (
              <CancelIcon sx={{ color: red[500], width: 20, height: 20 }} />
            ) : (
              <HighlightOffIcon
                sx={{ color: red[500], width: 20, height: 20 }}
              />
            )}
            {/* for closed motion */}
            {/* <Box className=" text-[10px] text-black px-[5px] py-[2px] flex flex-row items-center gap-x-1 rounded-full border border-gray-300">
                            <CloseIcon sx={{color: red[500], width: 15, height: 15}}/>
                            2
                        </Box> */}
          </Box>
        </Box>
      </Box>
      <Box className="flex h-[10px] w-full flex-row justify-end">
        <p className="text-[8px] text-black">Time: {time}</p>
      </Box>
    </Box>
  );
}
