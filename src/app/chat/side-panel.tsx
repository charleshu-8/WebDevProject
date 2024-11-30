import { Box, Button } from "@mui/material";
import CommitteeCard from "./committees/committe-cards";
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
  }, [panel]);

  const panelButtonTitle = useMemo(() => {
    switch (panel) {
      case Panel.COMMITTEES:
        return isMakeCommittee ? "Exit Committee Creation" : "Add Committee";
      case Panel.MOTIONS:
        return "Add Motion";
      default:
        return "";
    }
  }, [panel, isMakeCommittee]);

  function handlePanelAddButtonClick() {
    switch (panel) {
      case Panel.COMMITTEES:
        handleToggleMakeCommittee(!isMakeCommittee);
        break;
      case Panel.MOTIONS:
        handleToggleIsNewMotion();
        break;
    }
  }

  // Function to handle when a motion card is clicked
  async function handleMotionCardClick(key: string): Promise<void> {
    setCurrentMotion(key);
    setSelectedMotion((await getMotionDetails(getCurrentMotion())).title);
    setReloadChatBox(true);
  }

  function getClassNameForMotionCard(motionKey: string): string {
    if (selectedMotion === motionKey) {
      return "border-[6px] border-blue-500 rounded-[7px]";
    }
    return "";
  }

  // Async function to query all motions from the current committee
  async function queryMotions() {
    const motionIds = await getCommitteeMotions(getCurrentCommittee());
    const motionIdFilter = motionIds.map((id: string) => `id='${id}'`).join("||");
    const motions = await getFilteredMotions(
      motionIdFilter,
      "-updated",
      "messages"
    );
    const idMap = await getIdUsernameMapping();

    const motionCardProps = await Promise.all(
      motions.map(async (motion) => {
        let seconderFullName = "";
        let ownerFullName = "";
        try {
          seconderFullName = motion.expand.messages[1]?.owner || "";
          ownerFullName = motion.expand.messages[0]?.owner || "";
        } catch {
          console.info("No seconder or owner on motion:", motion.title);
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
      })
    );

    setMotionIds(motionIds);
    setMotions(motionCardProps);
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
        fetchMotions();
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
        {(panel === Panel.COMMITTEES || panel === Panel.MOTIONS) && (
          <Button
            className="mt-3 bg-extra-dark-blue text-xs text-white dark:bg-dark-background dark:text-dark-accent"
            onClick={handlePanelAddButtonClick}
          >
            {panelButtonTitle}
          </Button>
        )}
        {panel === Panel.COMMITTEES && <CommitteeCard />}
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