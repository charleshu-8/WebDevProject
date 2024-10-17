import { Button, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function NavBar(){
    const user = "First Name Last Name"
    return (
        <Box className="sticky flex flex-row bg-darker-blue w-screen h-[6vw] min-h-[80px]" >
            <Box className="w-2/5 h-full ml-[10%] flex items-center">
                <h1 className="text-[2em] text-white font-bold font-roboto m-2">Team Slackers</h1>
            </Box>
            <Box className='w-3/5 h-full flex items-center justify-end'>

                <Button className="w-auto font-darker-blue h-auto bg-white flex flex-row items-center gap-[1.25rem] rounded-[5rem] mr-10">
                    <Box className="text-darker-blue text-sm">
                        <PersonOutlineIcon/> 
                    </Box>

                    <Box>
                        <span className="text-[0.75rem] text-darker-blue font-darker-blue">
                            {user} 
                        </span>
        
                    </Box>

                </Button>
            
            </Box>
        </Box>
        

    );
}