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
import {
  getCommitteeMotions,
  getFullCommitteeMotions,
} from "@/app/db/committees";
import { getMotionDetails } from "@/app/db/motions";
import { get } from "http";
import { on } from "events";

interface SidePanelProps {
  panelVersion: Panel;
  handleToggleIsNewMotion: () => void;
  onClick?: () => void;
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
  key: string;
  onClick: () => void;
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

  async function handleMotionCardClick(key: string): Promise<void> {
    // You can add additional logic here to handle the motionKey
    setCurrentMotion(key); // Update the current motion
    setSelectedMotionKey((await getMotionDetails(getCurrentMotion())).title); // Update the state variable
  }

  // State to store motions as objects
  const [motions, setMotions] = useState<MotionCardProps[]>([]);
  const [motionKeys, setMotionKeys] = useState<string[]>([]);
  const [selectedMotionKey, setSelectedMotionKey] = useState<string | null>(
    null,
  );

  // asycn function to query all motions from the current committee
  async function queryMotions() {
    // Get the list of motion keys for the current committee
    const motionKeys = await getCommitteeMotions(getCurrentCommittee());

    // Initialize an array to hold the motion card properties
    const motionCardProps: MotionCardProps[] = [];

    // Loop through each motion key and get the motion details
    for (const key of motionKeys) {
      const motion = await getMotionDetails(key);
      motionCardProps.push({
        motionTitle: motion.title,
        motionStatus: "TBD",
        shortName: "CR:",
        fullName: "YEET",
        motionText: motion.title,
        seconderShortName: "SD:",
        seconderFullName: "YEET2",
        time: motion.created,
        key: key,
        onClick: () => handleMotionCardClick(key),
      });
      setCurrentMotion(key);
      setSelectedMotionKey(key);
    }

    // Update the state with the list of motion keys and motion card properties
    setMotionKeys(motionKeys);
    setMotions(motionCardProps);
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
        {panel === Panel.MOTIONS && (
          <Box className="mt-2 text-xs text-black dark:text-dark-text">
            {selectedMotionKey
              ? `Selected Motion Key: ${selectedMotionKey}`
              : "No motion selected"}
          </Box>
        )}
        {/*Side panel content will go here --> so mapping motions and displaying below or committees */}
        {panel === Panel.MOTIONS && (
          <>
            <Box className="h-full w-[90%] overflow-auto">
              {motions.map((motion) => (
                <Box
                  key={motion.key}
                  className="flex h-[30%] w-full items-center justify-center gap-y-2"
                  onClick={() => handleMotionCardClick(motion.key)}
                >
                  <MotionCard
                    key={motion.key}
                    motionTitle={motion.motionTitle}
                    motionStatus={motion.motionStatus}
                    shortName={motion.shortName}
                    fullName={motion.fullName}
                    motionText={motion.motionText}
                    seconderShortName={motion.seconderShortName}
                    seconderFullName={motion.seconderFullName}
                    time={motion.time}
                    onClick={() => handleMotionCardClick(motion.key)}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
