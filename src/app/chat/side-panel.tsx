import React from "react";
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
import { getIdUsernameMapping } from "../db/users";
import { getInitials } from "../utils/initials";

interface SidePanelProps {
  panelVersion: Panel;
  handleToggleMakeCommittee: (value: boolean) => void;
  isMakeCommittee: boolean;
  handleToggleIsNewMotion: () => void;
  setReloadChatBox: (value: boolean) => void; // Add this prop
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
  isMakeCommittee,
  panelVersion,
  handleToggleMakeCommittee = (value: boolean) => {},
  handleToggleIsNewMotion,
  setReloadChatBox,
}: SidePanelProps) {
  const panel = panelVersion;

  // State to store motions as objects
  const [motions, setMotions] = useState<MotionCardProps[]>([]);
  const [motionIds, setMotionIds] = useState<string[]>([]);
  const [selectedMotion, setSelectedMotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const panelTitle: string = useMemo(() => {
    switch (panel) {
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
        if (!isMakeCommittee) {
          return "Add Committee";
        } else {
          return "Exit Committee Creation";
        }
      case Panel.MOTIONS:
        return "Add Motion";
      default:
        return "";
    }
  }, [panel, isMakeCommittee]);

  function handlePanelAddButtonClick() {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        if (!isMakeCommittee) {
          console.log("Rendering add committee");
        } else {
          console.log("Returning from add committee");
        }
        handleToggleMakeCommittee(!isMakeCommittee);
        break;
      case Panel.MOTIONS:
        console.log("Rendering add motion");
        handleToggleIsNewMotion();
        break;
    }
  }

  // Function to handle when a motion card is clicked
  async function handleMotionCardClick(key: string): Promise<void> {
    // You can add additional logic here to handle the motionKey
    setCurrentMotion(key); // Update the current motion
    setSelectedMotion((await getMotionDetails(getCurrentMotion())).title); // Update the state variable
    setReloadChatBox(true); // Toggle the reload state
  }

  function getClassNameForMotionCard(motionKey: string): string {
    console.info("Selected motion:", selectedMotion);
    console.info("Checking against:", motionKey);
    if (selectedMotion === motionKey) {
      //console.info("Selected motion:", selectedMotion);
      //console.info("Checking against:", motionKey);
      return "border-[6px] border-blue-500 rounded-[7px]";
    }
    return "";
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
    const motions = await getFilteredMotions(
      motionIdFilter,
      "-updated",
      "messages",
    );

    // Get ID -> username map
    const idMap = await getIdUsernameMapping();

    // Loop through each motion and convert into a motion card property
    const motionCardProps = motions.map(async (motion) => {
      let seconderFullName = "";
      let ownerFullName = "";
      try {
        seconderFullName = motion.expand.messages[1].owner;
        ownerFullName = motion.expand.messages[0].owner;
      } catch (e) {
        console.info("No seconder on motion " + motion.title);
        console.info("No owner on motion " + motion.title);
      }
      return {
        motionTitle: motion.title,
        motionStatus: "TBD",
        shortName: getInitials(idMap?.get(ownerFullName) || "N/A"),
        fullName: idMap?.get(ownerFullName) || "N/A",
        motionText: motion.title,
        seconderShortName: getInitials(idMap?.get(seconderFullName) || "N/A"),
        seconderFullName: idMap?.get(seconderFullName) || "N/A",
        time: motion.created,
        key: motion.id,
        onClick: () => handleMotionCardClick(motion.id),
      };
    });

    // Wait for all promises to resolve
    const resolvedMotionCardProps = await Promise.all(motionCardProps);

    // Update the state with the list of motion keys and motion card properties
    setMotionIds(motionIds);
    setMotions(resolvedMotionCardProps);
  }

  // Get all available messages for a motion
  async function fetchMotions() {
    setLoading(true);
    try {
      await queryMotions();
    } finally {
      setLoading(false);
    }
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

  // Set selected motion and call handleMotionCardClick on mount
  useEffect(() => {
    const currentMotion = getCurrentMotion();
    if (currentMotion) {
      setSelectedMotion(currentMotion);
      handleMotionCardClick(currentMotion);
    }
  }, []);

  return (
    <Box className="flex h-full w-[80%] min-w-[8rem] flex-grow flex-col bg-light-secondary p-2 dark:bg-extra-dark-blue">
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
          <>
            {loading ? (
              <Box className="mt-10 flex h-full w-[90%] justify-center">
                <CircularProgress />
              </Box>
            ) : (
              <Box className="mt-2 h-full w-[90%] overflow-auto">
                {motions.map((motion) => (
                  <Box
                    key={motion.key}
                    className={`mb-4 flex h-[30%] w-[90%] items-center justify-center gap-y-2 ${getClassNameForMotionCard(motion.motionTitle)}`}
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
