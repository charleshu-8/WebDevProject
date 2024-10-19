import {Box,IconButton, Button} from "@mui/material"
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StarsIcon from '@mui/icons-material/Stars';
import SettingsIcon from '@mui/icons-material/Settings';
export default function SideBar(){
    return(
        <Box className="fixed flex flex-col items-center left-0 top-0 p4-[10px] h-full w-[7vw] min-w-[80px] bg-darker-blue ">
            <IconButton className="text-white mt-[1.5rem]"><MenuIcon/></IconButton>
            <Box className="flex h-full w-full flex-col items-center gap-[1rem] mt-[10vh]">
                <IconButton className="aspect-square w-3/4 bg-opacity-100 rounded-xl bg-white text-darker-blue"><GroupsIcon/></IconButton>
                <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue"><ChatIcon/></IconButton>
                <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue"><EventNoteIcon/></IconButton>
                <IconButton className="aspect-square w-3/4 rounded-xl bg-white text-darker-blue"><StarsIcon/></IconButton>
            </Box>
            <IconButton className="text-white mb-[1rem]">
                <SettingsIcon/>
            </IconButton>
        </Box>
    );
}