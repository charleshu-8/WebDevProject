import React from "react";
import { Box, Button } from "@mui/material";
//import CommitteeCard from "./committees/committe-cards";
import CommitteeCard from "./committees/committe-cards";
import { Panel } from "./panelEnum";

interface SidePanelProps {
  panelVersion: Panel;
  handleToggleIsNewMotion: () => void;
}

export default function SidePanel({
  panelVersion,
  handleToggleIsNewMotion,
}: SidePanelProps) {
  const panelTitle: string = React.useMemo(() => {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        return "All Committees";
      case Panel.MOTIONS:
        return "Committee Motions";
      case Panel.AGENDA:
        return "Current Agenda";
      case Panel.ROLES:
        return "Current Role";
      default:
        return "";
    }
  }, [panelVersion]);

  const panelButtonTitle = React.useMemo(() => {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        return "Add Committee";
      case Panel.MOTIONS:
        return "Add Motion";
      default:
        return "";
    }
  }, [panelVersion]);

  function handlePanelAddButtonClick() {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        console.log("Rendering add committee");
        break;
      case Panel.MOTIONS:
        console.log("Rendering add motion");
        handleToggleIsNewMotion();
        break;
    }
  }

  return (
    <Box className="flex h-full w-auto min-w-[8rem] flex-grow flex-col bg-light-secondary p-2 dark:bg-extra-dark-blue">
      <Box className="flex h-auto w-full justify-start">
        <h2 className="panel-title m-2 h-auto w-auto font-bold text-black dark:text-dark-text">
          {panelTitle}
        </h2>
      </Box>
      <Box className="panel-content flex h-full w-full flex-col items-center gap-y-2 overflow-y-auto">
        {(panelVersion === Panel.COMMITTEES || panelVersion === Panel.MOTIONS) && (
          <Button
            className="mt-3 bg-extra-dark-blue text-xs text-white dark:bg-dark-background dark:text-dark-accent"
            onClick={handlePanelAddButtonClick}
          >
            {panelButtonTitle}
          </Button>
        )}

        {/* bring out CommitteeCard if the panel is Committees */}
        {panelVersion === Panel.COMMITTEES && <CommitteeCard />}
      </Box>
    </Box>
  );
}
