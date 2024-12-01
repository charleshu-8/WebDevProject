import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import CommitteeCard from "./committees/committee-cards";
import { Panel } from "./panelEnum";
import { pb } from "@/app/db/pocketbase";

interface SidePanelProps {
  panelVersion: Panel;
  handleToggleMakeCommittee: (value: boolean) => void;
  isMakeCommittee: boolean;
}

export default function SidePanel({
  panelVersion,
  handleToggleMakeCommittee,
  isMakeCommittee,
}: SidePanelProps) {
  const [committees, setCommittees] = useState<any[]>([]);
  const [selectedCommittee, setSelectedCommittee] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (panelVersion === Panel.COMMITTEES) {
      fetchCommittees();
    }
  }, [panelVersion]);

  const panelTitle: string = useMemo(() => {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        return "All Committees";
      default:
        return "";
    }
  }, [panelVersion]);

  const panelButtonTitle = useMemo(() => {
    switch (panelVersion) {
      case Panel.COMMITTEES:
        return isMakeCommittee ? "Exit Committee Creation" : "Add Committee";
      default:
        return "";
    }
  }, [panelVersion]);

  const handlePanelAddButtonClick = () => {
    if (panelVersion === Panel.COMMITTEES) {
      handleToggleMakeCommittee(!isMakeCommittee);
    }
  };

  const handleCommitteeClick = (id: number) => {
    setSelectedCommittee(id);
    console.log(`Committee with ID ${id} clicked.`);
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

      {/* Conditional Content for Committees */}
      <Box className="panel-content flex h-full w-full flex-col gap-y-2 overflow-y-auto">
        {loading ? (
          <Box className="flex justify-center items-center h-full">
            <CircularProgress />
          </Box>
        ) : (
          committees.map((committee) => (
            <CommitteeCard
              key={committee.id}
              id={committee.id}
              title={committee.title}
              memberCount={committee.members?.length || 0}
              selected={committee.id === selectedCommittee}
              onClick={handleCommitteeClick}
            />
          ))
        )}
        {!loading && committees.length === 0 && (
          <p className="text-gray-500 text-center">No committees found.</p>
        )}
      </Box>
    </Box>
  );
}