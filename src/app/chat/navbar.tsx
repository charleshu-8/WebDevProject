import { Button, Box} from '@mui/material';
import './navbar.css';

export default function navbar(){
    return (
        <Box className="sticky bg-darker-blue w-[100%] h-7vw">
            <Box className="w-[100%] h-[100%] ml-[10%] flex items-center ">
                <h1 className="text-white font-bold">Team Slackers</h1>
            </Box>
            <Box className="fixed right-0 top-00 h-[20%] w-30px color">
                <Button className="w-20px h-20px bg-white" >

                </Button>
            </Box>
        </Box>
        

    );
}