"use client";

import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { ChatMessage } from "./chat-box";
import { currentUser } from "@/app/db/pocketbase";
import UserAvatar from "./user-avatar";

// Render the avatar pic for each message box using UserAvatar component
function renderAvatarPic(
  memberAvatars: Map<string, string>,
  messageOwner: string,
) {
  const currentAvatar = memberAvatars.get(messageOwner) as string;
  const initial = messageOwner[0].toUpperCase();
  return (
    <UserAvatar avatarBackground={currentAvatar} displayInitial={initial} />
  );
}

// Creates message box element based on whether message owner is current user or other committee member
// Memo caches component to prevent rerendering when props don't change
const MessageBox = memo(function MessageBox({
  messageProp,
  loadingState,
  memberAvatars,
}: {
  messageProp: ChatMessage;
  loadingState: boolean;
  memberAvatars: Map<string, string>;
}) {
  const isSender = messageProp.owner === currentUser?.id;
  return (
    <Box
      className={`mb-4 flex flex-col ${isSender ? "mr-1 items-end" : "items-start"}`}
    >
      <Typography variant="caption" className="text-gray-400">
        {messageProp.displayName}
      </Typography>
      <Box className="flex items-center" aria-label="Message Bubble Container">
        <Box
          className={`max-w-md rounded p-2 text-white ${isSender ? "order-1 bg-blue-500" : "order-2 bg-gray-300"}`}
          aria-label="Message Bubble"
        >
          {messageProp.text}
        </Box>
        <Box className={`${isSender ? "order-2 ml-2" : "order-1 mr-2"}`}>
          {!loadingState &&
            renderAvatarPic(memberAvatars, messageProp.displayName)}
        </Box>
      </Box>
    </Box>
  );
});

export default MessageBox;
