"use client";

import React, { useState } from "react";

export default function CommitteeCard() {
  const committees = [
    { id: 1, title: "Committee 1", description: "Uno 1", time: "10:00 AM" },
    { id: 2, title: "Committee 2", description: "Dos 2", time: "2:00 PM" },
    { id: 3, title: "Committee 3", description: "Tres 3", time: "5:00 PM" },
  ];

  const handleCardClick = (id: number) => {
    console.log(`Card with ID ${id} clicked!`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {committees.map((committee) => (
        <div
          key={committee.id}
          className="relative bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-150 w-full"
          onClick={() => handleCardClick(committee.id)}
        >
          {/* Timestamp */}
          <span className="absolute top-2 right-2 text-black text-sm">
            {committee.time}
          </span>

          {/* content */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-400 rounded-full w-8 h-8"></div>
            <h3 className="text-lg font-bold text-black">{committee.title}</h3>
          </div>

          {/* Description */}
          <p className="text-black mt-2">{committee.description}</p>
        </div>
      ))}
    </div>
  );
}
