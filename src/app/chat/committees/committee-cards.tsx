"use client";

import React from "react";

interface CommitteeCardProps {
  id: number;
  title: string;
  memberCount?: number; // Optional for showing members, if needed
  selected?: boolean; // Optional to highlight selected cards
  onClick: (id: number) => void;
}

export default function CommitteeCard({
  id,
  title,
  memberCount,
  selected = false,
  onClick,
}: CommitteeCardProps) {
  return (
    <div
      key={id}
      className={`relative bg-white rounded-lg shadow-md p-4 cursor-pointer w-full 
        ${selected ? "border-2 border-blue-500 bg-blue-50" : "hover:bg-gray-100"}`}
      onClick={() => onClick(id)}
    >
      {/* Title */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black truncate">{title}</h3>
        {memberCount !== undefined && (
          <span className="text-sm text-gray-500">{memberCount} Members</span>
        )}
      </div>
    </div>
  );
}