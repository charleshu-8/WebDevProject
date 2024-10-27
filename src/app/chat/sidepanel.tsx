import { Box } from "@mui/material";
import React, { useState, useEffect } from 'react';
import {Panel} from './panel';


export default function SidePanel({panelVersion}:{panelVersion:Panel}) {
    const [panelTitle, setPanelTitle] = useState('');
    const panel = panelVersion;

    useEffect(() => {
      switch(panel){
        case Panel.COMMITTEES:
          setPanelTitle('All Committees');
          break;
        case Panel.MOTIONS:
          setPanelTitle('Committee Motions');
          break;
      case Panel.AGENDA:
          setPanelTitle('Current Agenda');
          break;
      case Panel.ROLES:
          setPanelTitle('Current Role');
          break;
      default:
          setPanelTitle(''); // Reset title if panelVersion does not match any case
          break;
      }
    },[panelVersion]);

    return(
        <Box className="bg-light-secondary dark:bg-extra-dark-blue flex flex-grow flex-col h-full w-auto min-w-[8rem] p-2">
            <Box className="flex justify-start w-full h-auto">
                <h2 className="panel-title text-black dark:text-white font-bold w-auto h-auto m-2">{panelTitle}</h2>
            </Box>
            <Box className="panel-content flex flex-col h-full w-full items-center gap-y-2">
            </Box>
        </Box>
    );

  }