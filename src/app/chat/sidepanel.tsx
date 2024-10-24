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
        <Box className="bg-secondary h-full w-[25%] min-w-[15rem] p-2">
            <h1 className="panel-title text-black ">{title}

            </h1>
            <Box className="panel-content flex flex-col h-full w-full">

            </Box>

        </Box>
        

    );

}

export default SidePanel;



