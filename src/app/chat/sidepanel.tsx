import {Box} from "@mui/material";
import {Panel} from './panel';
import React, { useState } from 'react';
import Motion_Card from "./motion_card";

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
        <Box className="bg-light-secondary flex flex-col h-full w-[25%] min-w-[10rem] p-2 dark:bg-dark-background">
            <Box className="flex justify-start w-full h-auto">
                <h2 className="panel-title text-black w-auto h-auto m-2">{title}</h2>
            </Box>
            <Box className="panel-content flex flex-col h-full w-full items-center gap-y-2">
            </Box>
        </Box>
        

    );

}

export default SidePanel;



