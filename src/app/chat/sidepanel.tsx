import { Box, Button } from "@mui/material";
import React, { useState, useEffect ,useMemo} from 'react';
import {Panel} from './panel';


interface SidePanelProps {
  panelVersion: Panel;
}

export default function SidePanel({panelVersion}: SidePanelProps) {
  const panel = panelVersion;

    function handlePanelAddButtonClick(event: React.MouseEvent<HTMLButtonElement>){
      switch(panel){
        case Panel.COMMITTEES:
          console.log("Rendering add committee");
          break;
        case Panel.MOTIONS:
          console.log("Rendering add motion");
          break;
      }

    }

    const panelTitle: string = useMemo(()=>{
      switch(panel) {
        case Panel.COMMITTEES:
          return "All Committees";
        case Panel.MOTIONS:
          return "Comittee Motions";
        case Panel.AGENDA:
          return "Current Agenda";
        case Panel.ROLES:
          return "Current Role";
      }
    },[panel])

    const panelButtonTitle = useMemo(() => {
      switch(panel){
        case Panel.COMMITTEES:
          return "Add Committee";
        case Panel.MOTIONS:
          return "Add Motion";
      }


    },[panel]);


    return(
        <Box className="bg-light-secondary dark:bg-extra-dark-blue flex flex-grow flex-col h-full w-auto min-w-[8rem] p-2">
            <Box className="flex justify-start w-full h-auto">
                <h2 className="panel-title text-black dark:text-dark-text font-bold w-auto h-auto m-2">{panelTitle}</h2>
            </Box>
            <Box className="panel-content flex flex-col h-full w-full items-center gap-y-2">
              {/*check version here with && and then choose to render add committee button or add motion button
              then populate by fetching data from specific loc in db and returning a motion card or discussion card for each*/}
              {((panel === Panel.COMMITTEES || panel === Panel.MOTIONS )&& (<Button className="text-white text-xs bg-extra-dark-blue mt-3 dark:bg-dark-background dark:text-dark-accent" onClick={handlePanelAddButtonClick}>{panelButtonTitle}</Button>))}
              {/*Side panel content will go here --> so mapping motions and displaying below or committees */}
            </Box>
        </Box>
    );

  }