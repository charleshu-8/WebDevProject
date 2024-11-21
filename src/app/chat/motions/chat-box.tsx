"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import ChatInputField from "./chat-input-form";
import MotionInputField from "./motion-input-form";
import {
  currentUser,
  getCurrentMotion,
  pb,
  setCurrentMotion,
  getCurrentCommittee,
  avatarPathUrl,
} from "@/app/db/pocketbase";
import { formatDate, getCurrentTime } from "@/app/utils/time";
import { PocketbaseMessage } from "@/app/db/pocketbaseInterfaces";
import { addNewMotion, getMotionDetails } from "@/app/db/motions";
import getRandomColor from "@/app/utils/color";
import MessageBox from "./message-box";
import { getCommitteeMembers } from "@/app/db/committees";
import { addNewMessage } from "@/app/db/messages";

interface ChatBoxProps {
  isNewMotion: boolean;
  handleToggleIsNewMotion: () => void;
}

export interface ChatMessage {
  id?: string;
  text: string;
  timestamp: string;
  owner: string;
  displayName: string;
}

//let currentMotion = getCurrentMotion();

export default function ChatBox({
  isNewMotion,
  handleToggleIsNewMotion,
}: ChatBoxProps) {
  // State to store messages as objects with text and timestamp
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setCurrentMessage] = useState<string>("");

  // To track our asynchronous function progress so DOM is not rendered prematurely
  const [loadingMembers, setLoadingMembers] = useState(true);

  // State to store all committee members avatars depending on current committee
  const [currentAvatars, setCurrentAvatars] = useState<Map<string, string>>(
    new Map(),
  );

  // Ref to keep track of the container for automatic scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sift through users collection and find current committee members & avatars
  async function getMemberAvatarsByIds() {
    setLoadingMembers(true);
    const avatarPaths = new Map<string, string>();
    // Get list of member ids
    const memberIds = await getCommitteeMembers(getCurrentCommittee());
    const memberIdFilter = memberIds
      .map((id: string) => `id='${id}'`)
      .join("||");

    // Look through all users that exist until all members of current committee are found
    const result = await pb.collection("users").getFullList({
      fields: "username, avatar, id",
      filter: memberIdFilter,
    });

    // Save in hashmap
    result?.forEach((member) => {
      let avatarPic;
      // Check if avatar exists
      if (member.avatar !== "") {
        avatarPic = `${avatarPathUrl}/${member.id}/${member.avatar}`;
      } else {
        // Set random color as avatar otherwise
        avatarPic = getRandomColor();
      }
      avatarPaths.set(member.username, avatarPic);
    });

    setCurrentAvatars(avatarPaths);
    setLoadingMembers(false);
  }

  async function queryMessages() {
    const response = await pb.collection("motions").getOne(getCurrentMotion(), {
      expand: "messages",
      $autoCancel: false,
    });

    const helperArray: ChatMessage[] = [];
    response?.expand?.messages.forEach((message: PocketbaseMessage) => {
      const formattedDate = formatDate(message.created);
      helperArray.push({
        id: message.id,
        text: message.text,
        timestamp: formattedDate,
        owner: message.owner,
        displayName: message.displayName,
        // Map profile path to display name
      });
    });
    helperArray.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    setMessages(helperArray);
  }

  // Get all available messages for a motion
  async function fetchMessages() {
    await queryMessages();
  }

  // Process and send a given message to the DB
  // Flag is set if messages should be wiped, resetting motion
  async function sendMessage(message: string, flag: boolean = false) {
    if (message.trim()) {
      console.log("messages", messages);
      // Add message along with timestamp
      const currentTime =
        getCurrentTime() + " " + new Date().toLocaleDateString();
      const newMessage = {
        text: message,
        timestamp: currentTime,
        owner: currentUser?.id,
        displayName: currentUser?.username,
      };

      if (!flag) {
        setMessages([...messages, newMessage]);
      } else {
        setMessages([newMessage]);
      }

      if (
        !(await addNewMessage(
          message,
          currentUser?.id,
          getCurrentMotion(),
          currentUser?.username,
        ))
      ) {
        console.error("Failed to publish message");
      }
      setCurrentMessage(""); // Clear input after sending
    }
  }

  // Publish a motion to the DB
  function sendNewMotion(message: string) {
    if (message.trim()) {
      addNewMotion(message, getCurrentCommittee()).then((motion) => {
        setCurrentMotion(motion === false ? "" : motion.id);
        sendMessage(message, true);
        handleToggleIsNewMotion();
      });
    }
  }

  // Effect to scroll to the bottom whenever the messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listens for DB updates to messages to refetch messages
  // Also refetches upon motion or committee change
  useEffect(() => {
    if (getCurrentCommittee() && getCurrentMotion()) {
      fetchMessages();

      // get updated members & avatar pics based on current committee
      getMemberAvatarsByIds();

      // Subscribe to updates for the specific motion
      pb.collection("motions").subscribe(getCurrentMotion(), () => {
        fetchMessages(); // Fetch new messages when updated
        console.log("something changed");
      });

      // Cleanup subscription on component unmount
      return () => {
        pb.collection("motions").unsubscribe(getCurrentMotion());
      };
    }
  }, []);

  return (
    <Box className="flex h-full w-full flex-col bg-gray-200 p-4">
      {/* Display messages */}
      <Box className="mb-2 flex-grow overflow-y-auto bg-white p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          messages.map((message, index) => (
            <MessageBox
              messageProp={message}
              loadingState={loadingMembers}
              memberAvatars={currentAvatars}
              key={index}
            />
          ))
        )}
        {/* Invisible div to maintain scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
        }}
      >
        {isNewMotion ? (
          <MotionInputField onSendMessage={sendNewMotion} />
        ) : (
          <ChatInputField onSendMessage={sendMessage} />
        )}
      </form>
    </Box>
  );
}
