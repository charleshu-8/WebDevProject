import {Box} from "@mui/material";
import './panel';
import React, { useState } from 'react';

export default function SidePanel(version : Panel) {

    const title = "Motions";

    /**
     * Function: will render the motion component if needed
     */

    const RenderMotions = () => {
    

    }

    return(
        <Box className="bg-secondary h-full w-[25%] min-w-[15rem]">
            <h1 className="panel-title text-black ">{title}

            </h1>

        </Box>
        

    );

}



