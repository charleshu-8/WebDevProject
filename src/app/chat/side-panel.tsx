import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Panel } from "./panel";

export default function SidePanel({ panelVersion }: { panelVersion: Panel }) {
  const [panelTitle, setPanelTitle] = useState("");
  const panel = panelVersion;

  useEffect(() => {
    switch (panel) {
      case Panel.COMMITTEES:
        setPanelTitle("All Committees");
        break;
      case Panel.MOTIONS:
        setPanelTitle("Committee Motions");
        break;
      case Panel.AGENDA:
        setPanelTitle("Current Agenda");
        break;
      case Panel.ROLES:
        setPanelTitle("Current Role");
        break;
      default:
        setPanelTitle(""); // Reset title if panelVersion does not match any case
        break;
    }
  }, [panelVersion]);

  return (
    <Box className="flex h-full w-auto min-w-[8rem] flex-grow flex-col bg-light-secondary p-2 dark:bg-extra-dark-blue">
      <Box className="flex h-auto w-full justify-start">
        <h2 className="panel-title m-2 h-auto w-auto font-bold text-black dark:text-white">
          {panelTitle}
        </h2>
      </Box>
      <Box className="panel-content flex h-full w-full flex-col items-center gap-y-2"></Box>
    </Box>
  );
}
