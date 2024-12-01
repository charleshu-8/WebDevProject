"use client";

import React from "react";
import { Box } from "@mui/material";

interface CommitteeCardProps {
  id: number; // Unique identifier for the committee
  title: string; // Title of the committee
  onClick: (id: number) => void; // Callback function for when the card is clicked
}

export default function CommitteeCard({
  id,
  title,
  onClick,
}: CommitteeCardProps) {
  return (
    <Box
      className="flex flex-col justify-center gap-y-2 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-100 w-full"
      onClick={() => onClick(id)}
      role="button"
      aria-label={`Committee card for ${title}`}
    >
      {/* Title */}
      <Box className="flex flex-row justify-start items-center">
        <p
          className="text-lg font-bold text-black truncate"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </p>
      </Box>
    </Box>
  );
}