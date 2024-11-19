"use client";

import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import {ChatMessage} from "./chat-box";
import {
  currentUser,
} from "@/app/db/pocketbase";

// custom component to render the avatar profile pic for members
const AvatarPic = ({ messageOwner, memberAvatars }: { messageOwner: string, memberAvatars: Map<string,string>}) => {
    
  const avatarPic = memberAvatars.get(messageOwner) as string;
  // check if avatar exists for message owner
  // never should be empty
  if (avatarPic !== "" && avatarPic !== undefined && avatarPic[0] !== "#") {
    return (
      <img
        src={avatarPic}
        className="flex h-6 w-6 items-center justify-center rounded-full"
        loading="lazy"
      />
    );
  } else {
    return (
      // default: show user's initial w color background
      <Box
        className="flex h-6 w-6 items-center justify-center rounded-full text-white"
        sx={{ backgroundColor: avatarPic }}
      >
        {messageOwner[0].toUpperCase()}
      </Box>
    );
  }
};


// custom component for creating the message box elements based on
  // whether message owner is the current user or other committee member
  // memo caches component so it doesn't re-render when message props don't change


  const MessageBox = memo(({ messageProp, loadingState, memberAvatars }: { messageProp: ChatMessage, loadingState: boolean, memberAvatars:Map<string,string>}) => {
    const isSender = messageProp.owner === currentUser?.id;
    console.log(`${messageProp.displayName} --> ${messageProp.text}`);
    return (
      <Box
        className={`mb-4 flex flex-col ${isSender ? "mr-1 items-end" : "items-start"}`}
      >
        <Typography variant="caption" className="text-gray-400">
          {messageProp.displayName}
        </Typography>
        <Box
          className="flex items-center"
          aria-label="Message Bubble Container"
        >
          <Box
            className={`max-w-md rounded p-2 text-white ${isSender ? "order-1 bg-blue-500" : "order-2 bg-gray-300"}`}
            aria-label="Message Bubble"
          >
            {messageProp.text}
          </Box>
          <Box className={`${isSender ? "order-2 ml-2" : "order-1 mr-2"}`}>
            {!loadingState && (
              <AvatarPic messageOwner={messageProp.displayName} memberAvatars={memberAvatars}/>
            )}
          </Box>
        </Box>
      </Box>
    );
  });

  // to satisfy eslint
  MessageBox.displayName = "MessageBox";
  export default MessageBox;