"use client";

import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import {ChatMessage} from "./chat-box";
import {
  currentUser,
} from "@/app/db/pocketbase";
import AvatarPic from "./avatar-pic";

// function to render the avatar pic for each message box
// using custom AvatarPic component

function renderAvatarPic (memberAvatars:Map<string,string>, messageOwner:string){
  const currentAvatar = memberAvatars.get(messageOwner) as string;
  const initial = messageOwner[0].toUpperCase();
  return(
    <AvatarPic avatarBackground={currentAvatar} displayInitial={initial}/>
  );
}


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
            {!loadingState && renderAvatarPic(memberAvatars, messageProp.displayName)}
          </Box>
        </Box>
      </Box>
    );
  });

  // to satisfy eslint
  MessageBox.displayName = "MessageBox";
  export default MessageBox;