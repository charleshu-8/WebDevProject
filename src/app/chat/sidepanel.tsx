import {Box} from "@mui/material";
import {Panel} from './panel';
import React, { useState } from 'react';

interface PanelProps {
    version: Panel;
}

const SidePanel = (version:PanelProps) => {

    const title = "Motions";

    /**
     * Function: will render the motion component if needed
     *  const RenderMotions = () => {
    

    }

     */

    return(
        <Box className="bg-secondary flex flex-col h-full w-[25%] min-w-[15rem] p-2 dark:bg-black">
            <Box className="absolute topw-full h-auto">
            <h2 className="panel-title text-black w-auto h-auto m-10">{title}</h2>
            </Box>
            
            <Box className="panel-content flex flex-col h-full w-full">

            </Box>

        </Box>
        

    );

}

export default SidePanel;



