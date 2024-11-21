import { Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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

interface MotionCardProps {
  motionTitle: string;
  motionStatus: string;
  shortName: string;
  fullName: string;
  motionText: string;
  seconderShortName: string;
  seconderFullName: string;
  time: string;
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

  // State to store motions as objects
  const [motions, setMotions] = useState<MotionCardProps[]>([]);

  // asycn function to query all motions from the current committee
  async function queryMotions() {
    const pocketbaseMotions = await getFullCommitteeMotions(
      getCurrentCommittee(),
    );
    const motionCardProps = pocketbaseMotions.map((motion) => ({
      motionTitle: motion.title,
      motionStatus: "TBD",
      shortName: "CR:",
      fullName: "YEET",
      motionText: motion.title,
      seconderShortName: "SD:",
      seconderFullName: "YEET2",
      time: motion.created,
    }));
    setMotions(motionCardProps);
    return motions;
  }

  // Get all available messages for a motion
  async function fetchMotions() {
    await queryMotions();
  }

  // Listens for DB updates to motions to refetch motions
  // Also refetches upon motion or committee change
  useEffect(() => {
    if (getCurrentCommittee() && getCurrentMotion()) {
      fetchMotions();

      // Subscribe to updates for the specific motion
      pb.collection("committees").subscribe(getCurrentCommittee(), () => {
        fetchMotions(); // Fetch new messages when updated
        console.log("something changed");
      });

      // Cleanup subscription on component unmount
      return () => {
        pb.collection("committees").unsubscribe(getCurrentCommittee());
      };
    }
  }, []);

  return (
    <Box className="flex h-full w-auto min-w-[8rem] flex-grow flex-col bg-light-secondary p-2 dark:bg-extra-dark-blue">
      <Box className="flex h-auto w-full justify-start">
        <h2 className="panel-title m-2 h-auto w-auto font-bold text-black dark:text-dark-text">
          {panelTitle}
        </h2>
      </Box>
      <Box className="panel-content flex h-full w-full flex-col items-center gap-y-2 overflow-auto">
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
            <Box className="h-full w-[90%] overflow-auto">
              {motions.map((motion, index) => (
                <MotionCard
                  key={index}
                  motionTitle={motion.motionTitle}
                  motionStatus={motion.motionStatus}
                  shortName={motion.shortName}
                  fullName={motion.fullName}
                  motionText={motion.motionText}
                  seconderShortName={motion.seconderShortName}
                  seconderFullName={motion.seconderFullName}
                  time={motion.time}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
