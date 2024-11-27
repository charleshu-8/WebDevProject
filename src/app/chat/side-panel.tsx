import { Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Panel } from "./panelEnum";
import MotionCard from "./motions/motion-card"; // Adjust the import path as necessary
import {
  getCurrentMotion,
  pb,
  setCurrentMotion,
  getCurrentCommittee,
} from "@/app/db/pocketbase";
import { getCommitteeMotions } from "@/app/db/committees";
import { getFilteredMotions, getMotionDetails } from "@/app/db/motions";
import { CircularProgress } from "@mui/material";
import { ChatMessage } from "./motions/chat-box";
import { PocketbaseMessage } from "../db/pocketbaseInterfaces";
import { formatDate, getCurrentTime } from "@/app/utils/time";

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
    setSelectedMotion((await getMotionDetails(getCurrentMotion())).title); // Update the state variable
  }

  // State to store motions as objects
  const [motions, setMotions] = useState<MotionCardProps[]>([]);
  const [motionIds, setMotionIds] = useState<string[]>([]);
  const [selectedMotion, setSelectedMotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function getCreatorAndSeconder(motion: string): Promise<string[]> {
    const response = await pb.collection("motions").getOne(motion, {
      expand: "messages",
      $autoCancel: false,
    });

    const helperArray: ChatMessage[] = [];
    response?.expand?.messages.forEach((message: PocketbaseMessage) => {
      const formattedDate = formatDate(message.created);
      helperArray.push({
        id: message.id,
        text: message.text,
        timestamp: formattedDate,
        owner: message.owner,
        displayName: message.displayName,
      });
    });
    helperArray.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    let retArray = [];
    retArray.push(helperArray[0].owner);
    retArray.push(helperArray[1].owner);
    return retArray;
  }

  // asycn function to query all motions from the current committee
  async function queryMotions() {
    // Get the list of motion keys for the current committee
    const motionIds = await getCommitteeMotions(getCurrentCommittee());
    // Convert it into a filter string
    const motionIdFilter = motionIds
      .map((id: string) => `id='${id}'`)
      .join("||");

    // Retrieve all motions according to the ID filter
    const motions = await getFilteredMotions(motionIdFilter, "-updated");

    // Loop through each motion and convert into a motion card property
    const motionCardProps: MotionCardProps[] = motions.map((motion) => ({
      motionTitle: motion.title,
      motionStatus: "TBD",
      shortName: "CR:",
      fullName: "YEET",
      motionText: motion.title,
      seconderShortName: "SD:",
      seconderFullName: "YEET2",
      time: motion.created,
      key: motion.id,
      onClick: () => handleMotionCardClick(motion.id),
    }));

    // Update the state with the list of motion keys and motion card properties
    setMotionIds(motionIds);
    setMotions(motionCardProps);
  }

  // Get all available messages for a motion
  const fetchMotions = async () => {
    setLoading(true);
    try {
      await queryMotions();
    } finally {
      setLoading(false);
    }
  };

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
            {selectedMotion
              ? `Selected Motion: ${selectedMotion}`
              : "No motion selected"}
          </Box>
        )}
        {panel === Panel.MOTIONS && (
          <>
            {loading ? (
              <Box className="mt-10 flex h-full w-[90%] justify-center">
                <CircularProgress />
              </Box>
            ) : (
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
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
