import { Box, Avatar } from "@mui/material";
import { blue, purple } from "@mui/material/colors";

interface MotionCardProps {
  motionTitle: string;
  motionStatus: string;
  shortName: string;
  fullName: string;
  motionText: string;
  seconderShortName: string;
  seconderFullName: string;
  time: string;
}

export default function MotionCard(props: MotionCardProps) {
  return (
    <Box className="flex h-[140px] flex-col justify-center gap-y-[5px] rounded-[5px] border border-gray-300 bg-white px-[5px] py-[75px] dark:border-dark-background dark:bg-dark-primary">
      <Box className="flex h-[20px] w-full flex-row items-end justify-start gap-x-3">
        <p className="text-[12px] font-bold text-black">
          Motion: {props.motionTitle}
        </p>
        <p className="text-[10px] text-black">Status: {props.motionStatus}</p>
      </Box>
      <Box className="flex h-[20px] w-full flex-row items-center justify-start gap-x-3">
        <Box className="flex flex-row items-center gap-x-1">
          <Avatar
            sx={{ bgcolor: blue[500], width: 20, height: 20, fontSize: 10 }}
          >
            {props.shortName}
          </Avatar>
          <p className="text-[10px] font-bold text-black">{props.fullName}</p>
        </Box>
        <p className="text-[10px] text-black">moves that...</p>
      </Box>
      <Box className="flex h-[20px] w-full justify-center">
        <Box className="flex h-[20px] w-[125px] flex-row items-center justify-start rounded-full bg-gray-300">
          <p className="truncate px-[5px] py-[1px] text-center text-[10px] text-black">
            {props.motionText}
          </p>
        </Box>
      </Box>
      <Box className="flex h-[20px] w-full flex-row items-center justify-start gap-x-3">
        <p className="text-[10px] text-black">Seconded:</p>
        <Box className="flex h-[20px] w-fit flex-row items-center gap-x-1">
          <Avatar
            sx={{ bgcolor: purple[500], width: 20, height: 20, fontSize: 10 }}
          >
            {props.seconderShortName}
          </Avatar>
          <p className="text-[10px] font-bold text-black">
            {props.seconderFullName}
          </p>
        </Box>
      </Box>
      <Box className="flex h-[10px] w-full flex-row justify-end">
        <p className="text-[8px] text-black">Time: {props.time}</p>
      </Box>
    </Box>
  );
}
