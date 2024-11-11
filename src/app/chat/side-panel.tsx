import { Box, Button } from "@mui/material";
import React, { useMemo } from "react";
import { Panel } from "./panel";
import MotionCard from "./motion-card";

interface SidePanelProps {
  panelVersion: Panel;
}

export default function SidePanel({ panelVersion }: SidePanelProps) {
  const panel = panelVersion;

  function handlePanelAddButtonClick() {
    switch (panel) {
      case Panel.COMMITTEES:
        console.log("Rendering add committee");
        break;
      case Panel.MOTIONS:
        console.log("Rendering add motion");
        break;
    }
  }

  const panelTitle: string = useMemo(() => {
    switch (panel) {
      case Panel.COMMITTEES:
        return "All Committees";
      case Panel.MOTIONS:
        return "Comittee Motions";
      case Panel.AGENDA:
        return "Current Agenda";
      case Panel.ROLES:
        return "Current Role";
    }
  }, [panel]);

  const panelButtonTitle = useMemo(() => {
    switch (panel) {
      case Panel.COMMITTEES:
        return "Add Committee";
      case Panel.MOTIONS:
        return "Add Motion";
    }
  }, [panel]);

  return (
    <Box className="flex h-full w-auto min-w-[8rem] flex-grow flex-col bg-light-secondary p-2 dark:bg-extra-dark-blue">
      <Box className="flex h-auto w-full justify-start">
        <h2 className="panel-title m-2 h-auto w-auto font-bold text-black dark:text-dark-text">
          {panelTitle}
        </h2>
      </Box>
      <Box className="panel-content flex h-full w-full flex-col items-center gap-y-2">
        {/*check version here with && and then choose to render add committee button or add motion button
              then populate by fetching data from specific loc in db and returning a motion card or discussion card for each*/}
        {(panel === Panel.COMMITTEES || panel === Panel.MOTIONS) && (
          <Button
            className="mt-3 bg-extra-dark-blue text-xs text-white dark:bg-dark-background dark:text-dark-accent"
            onClick={handlePanelAddButtonClick}
          >
            {panelButtonTitle}
          </Button>
        )}
        {/*Side panel content will go here --> so mapping motions and displaying below or committees */}
        <MotionCard />
      </Box>
    </Box>
  );
}
