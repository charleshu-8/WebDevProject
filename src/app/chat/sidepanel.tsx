import { Box } from "@mui/material";
import React, { useState, memo, useEffect } from 'react';
import {Panel} from './panel';

 /**
  * has to be a const in order to re-render the component whenever the parent 
  * state variable setPanelVersion is updated by user clicks
  * memo() helps optimize performance by choosing to re-render component when
  * prop is updated
  * 
  */
const SidePanel = memo(({panelVersion}:{panelVersion:Panel}) => {
    const [panelTitle, setPanelTitle] = useState('');

    useEffect(() => {
      switch(panelVersion){
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
    }),[panelVersion];

    return(
        <Box className="bg-light-secondary dark:bg-extra-dark-blue flex flex-grow flex-col h-full w-auto min-w-[8rem] p-2 dark:bg-dark-background">
            <Box className="flex justify-start w-full h-auto">
                <h2 className="panel-title text-black font-bold w-auto h-auto m-2">{panelTitle}</h2>
            </Box>
            <Box className="panel-content flex flex-col h-full w-full items-center gap-y-2">
            </Box>
        </Box>
    );

  });

export default SidePanel;