import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import {Panel} from './panel';


interface SidePanelProps {
  panelVersion: Panel;
  updateInputField: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidePanel({panelVersion, updateInputField}: SidePanelProps) {
  const [panelTitle, setPanelTitle] = useState('');
  const [panelButtonTitle, setPanelButtonTitle] = useState('');
  const panel = panelVersion;

    function handlePanelButtonClick(event: React.MouseEvent<HTMLButtonElement>){
      switch(panel){
        case Panel.COMMITTEES:
          {/* render add committee on discussion page*/}
          console.log("Rendering add committee")
          break;
        case Panel.MOTIONS:
          updateInputField(true);
          console.log("Rendering add motion")
          break;
        default:
          break;

      }
    }


  useEffect(() => {
    switch(panel){
      case Panel.COMMITTEES:
        setPanelTitle('All Committees');
        setPanelButtonTitle('Add Committee')
        break;
      case Panel.MOTIONS:
        setPanelTitle('Committee Motions');
        setPanelButtonTitle('Add Motion')
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
}, [panelVersion]);


    return(
        <Box className="bg-light-secondary dark:bg-extra-dark-blue flex flex-grow flex-col h-full w-auto min-w-[8rem] p-2">
            <Box className="flex justify-start w-full h-auto">
                <h2 className="panel-title text-black dark:text-white font-bold w-auto h-auto m-2">{panelTitle}</h2>
            </Box>
            <Box className="panel-content flex flex-col h-full w-full items-center gap-y-2">
              {/*check version here with && and then choose to render add committee button or add motion button
              then populate by fetching data from specific loc in db and returning a motion card or discussion card for each*/}
              {((panel === Panel.COMMITTEES || panel === Panel.MOTIONS) && (<Button className="text-white bg-extra-dark-blue mt-3" onClick={handlePanelButtonClick}>{panelButtonTitle}</Button>))}
            </Box>
        </Box>
    );

  }