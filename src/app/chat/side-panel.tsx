import { Box, Button } from "@mui/material";
import React, { useMemo } from "react";
import { Panel } from "./panelEnum";
import MotionCard from "./motions/motion-card"; // Adjust the import path as necessary
import {
  currentUser,
  getCurrentMotion,
  pb,
  setCurrentMotion,
  getCurrentCommittee,
  avatarPathUrl,
} from "@/app/db/pocketbase";
import { getFullCommitteeMotions } from "@/app/db/committees";

interface SidePanelProps {
  panelVersion: Panel;
  handleToggleIsNewMotion: () => void;
}

export default function SidePanel({
  panelVersion,
  handleToggleIsNewMotion,
}: SidePanelProps) {
  const panel = panelVersion;

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

  function handlePanelAddButtonClick() {
    switch (panel) {
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
        {panel === Panel.MOTIONS && (
          <>
            <MotionCard
              motionTitle="Sample Motion"
              motionStatus="Pending"
              shortName="JD"
              fullName="John Doe"
              motionText="This is a sample motion text."
              seconderShortName="JS"
              seconderFullName="Jane Smith"
              time="12:00 PM"
            />
            <div>
              {getFullCommitteeMotions(getCurrentCommittee()).then(
                (motions) => (
                  <div>
                    {motions.map((motion) => (
                      <MotionCard
                        key={motion.id}
                        motionTitle={motion.title}
                        motionStatus="Pending"
                        shortName="JD"
                        fullName="John Doe"
                        motionText="This is a sample motion text."
                        seconderShortName="JS"
                        seconderFullName="Jane Smith"
                        time={motion.created}
                      />
                    ))}
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </Box>
    </Box>
  );
}
