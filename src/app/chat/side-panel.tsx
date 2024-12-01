import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import CommitteeCard from "./committees/committee-cards";
import { Panel } from "./panelEnum";
import { pb } from "@/app/db/pocketbase";

interface SidePanelProps {
  panelVersion: Panel;
  handleToggleIsNewMotion: () => void;
}

export default function SidePanel({
  panelVersion,
  handleToggleIsNewMotion,
}: SidePanelProps) {
  const [committees, setCommittees] = useState<any[]>([]); // Store committees fetched from the backend
  const [selectedCommittee, setSelectedCommittee] = useState<number | null>(null); // Track the selected committee
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch committees data
  const fetchCommittees = async () => {
    setLoading(true);
    try {
      const response = await pb.collection("committees").getFullList();
      setCommittees(response);
    } catch (error) {
      console.error("Error fetching committees:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch committees only when panelVersion is COMMITTEES
  useEffect(() => {
    if (panelVersion === Panel.COMMITTEES) {
      fetchCommittees();
    }
  }, [panelVersion]);

  const panelTitle: string = useMemo(() => {
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

  const panelButtonTitle = useMemo(() => {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        return "Add Committee";
      case Panel.MOTIONS:
        return "Add Motion";
      default:
        return "";
    }
  }, [panelVersion]);

  const handlePanelAddButtonClick = () => {
    if (panelVersion === Panel.COMMITTEES) {
      console.log("Rendering add committee");
    }
  };

  const handleCommitteeClick = (id: number) => {
    console.log(`Committee with ID ${id} clicked!`);
    setSelectedCommittee(id);
  };

  return (
    <Box className="flex h-full w-auto min-w-[8rem] flex-grow flex-col bg-light-secondary p-2 dark:bg-extra-dark-blue">
      {/* Panel Header */}
      <Box className="flex flex-col items-center w-full mb-4">
        <h2 className="panel-title font-bold text-black dark:text-dark-text">
          {panelTitle}
        </h2>
        {panelVersion === Panel.COMMITTEES && (
          <Button
            className="mt-3 bg-extra-dark-blue text-xs text-white dark:bg-dark-background dark:text-dark-accent"
            onClick={handlePanelAddButtonClick}
          >
            {panelButtonTitle}
          </Button>
        )}
      </Box>

      {/* Conditional Rendering Based on Panel Version */}
      <Box className="panel-content flex h-full w-full flex-col gap-y-2 overflow-y-auto">
        {panelVersion === Panel.COMMITTEES ? (
          loading ? (
            <Box className="flex justify-center items-center h-full">
              <CircularProgress />
            </Box>
          ) : (
            committees.map((committee) => (
              <CommitteeCard
                key={committee.id}
                id={committee.id}
                title={committee.title}
                memberCount={committee.members?.length || 0} // Assuming 'members' is an array
                selected={committee.id === selectedCommittee}
                onClick={handleCommitteeClick}
              />
            ))
          )
        ) : (
          <p className="text-gray-500 text-center">
            Select a panel to view its content.
          </p>
        )}
      </Box>
    </Box>
  );
}