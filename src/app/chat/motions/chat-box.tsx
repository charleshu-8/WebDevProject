"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import ChatInputField from "./chat-input-form";
import MotionInputField from "./motion-input-form";
import {
  currentUser,
  currentMotion,
  currentCommittee,
  pb, avatarPathUrl
} from "@/app/db/pocketbase";
import { formatDate, getCurrentTime } from "@/app/utils/time";
import { PocketbaseMessage } from "@/app/db/pocketbaseInterfaces";
import getRandomColor from "../../utils/colors";
import MessageBox from "./message-box";

interface ChatBoxProps {
  isNewMotion: boolean;
}

export interface ChatMessage {
  id?: string;
  text: string;
  timestamp: string;
  owner: string;
  displayName: string;
}

export default function ChatBox({ isNewMotion }: ChatBoxProps) {
  // State to store messages as objects with text and timestamp
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setCurrentMessage] = useState<string>("");
  // to track our asyncronous function/progress so DOM is not rendered prematurely
  const [loadingMembers, setLoadingMembers] = useState(true);

  // State to store all committee members avatars depending on current committee
  const [currentAvatars, setCurrentAvatars] = useState<Map<string, string>>(
    new Map(),
  );

  // Ref to keep track of the container for automatic scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  // get array of member ids in committee to find member avatars
  async function getCommitteeMembersIds() {
    if (currentUser) {
      const committeeMembers = await pb
        .collection("committees")
        .getOne(currentCommittee, {
          fields: "members",
          $autoCancel: false,
        });
      return committeeMembers.members;
    }
  }

  // function to sift through users collection and find current committee members & avatars
  async function getMemberAvatarsByIds() {
    setLoadingMembers(true);
    const avatarPaths = new Map<string, string>();
    // get list of member ids 
    const memberIds = await getCommitteeMembersIds();
    const memberIdFilter = memberIds
      .map((id: string) => `id='${id}'`)
      .join("||");
    // look through all users that exist until all members of current committee are found
    const result = await pb.collection("users").getFullList(20, {
      fields: "username, avatar,id",
      filter: memberIdFilter,
      $autoCancel: false,
    });
    // save in hashmap
    result?.forEach((member) => {
      let avatarPic;
      // check if avatar exists
      if (member.avatar !== "") {
        avatarPic = `${avatarPathUrl}/${member.id}/${member.avatar}`;
      } else {
        // set random color as avatar
        avatarPic = getRandomColor();
      }
      avatarPaths.set(member.username, avatarPic);
    });
    setCurrentAvatars(avatarPaths);
    setLoadingMembers(false);
  }

  async function helper() {
    const response = await pb.collection("motions").getOne(currentMotion, {
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
        // map profile path to display name
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
    await helper();
  }

  // Push a given message to the DB
  async function publishMessage(message: string) {
    try {
      const newMessage = await pb.collection("messages").create(
        {
          text: message,
          owner: currentUser?.id,
          motion: currentMotion,
          displayName: currentUser?.username,
        },
        {
          $autoCancel: false,
        },
      );

      console.log(newMessage);

      const motion = await pb.collection("motions").getOne(currentMotion, {
        expand: "messages",
        $autoCancel: false,
      });

      const updatedMessages = [...motion?.expand?.messages, newMessage];
      console.log(updatedMessages);

      await pb.collection("motions").update(
        currentMotion,
        {
          messages: updatedMessages.map((message) => message.id), // Ensure only message IDs are stored
        },
        {
          $autoCancel: false,
        },
      );
    } catch (error) {
      console.error("Failed to publish message:", error);
    }
  }


  // Process and send a given message to the DB
  function sendMessage(message: string) {
    if (message.trim()) {
      // Add message along with timestamp
      const currentTime =
        getCurrentTime() + " " + new Date().toLocaleDateString();
      setMessages([
        ...messages,
        {
          text: message,
          timestamp: currentTime,
          owner: currentUser?.id,
          displayName: currentUser?.username,
        },
      ]);
      publishMessage(message);
      setCurrentMessage(""); // Clear input after sending
    }
  }

  // Effect to scroll to the bottom whenever the messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listens for DB updates to messages to refetch messages
  // Also refetches upon motion or committee change
  useEffect(() => {
    if (currentCommittee && currentMotion) {
      fetchMessages();

      // get updated members & avatar pics based on current committee
      getMemberAvatarsByIds();

      // Subscribe to updates for the specific motion
      pb.collection("motions").subscribe(currentMotion, () => {
        fetchMessages(); // Fetch new messages when updated
      });

      // Cleanup subscription on component unmount
      return () => {
        pb.collection("motions").unsubscribe(currentMotion);
      };
    }
  }, [currentCommittee, currentMotion]);

  return (
    <Box className="flex h-full w-full flex-col bg-gray-200 p-4">
      {/* Display messages */}
      <Box className="mb-2 flex-grow overflow-y-auto bg-white p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          messages.map((message, index) => (
            <MessageBox messageProp={message} loadingState={loadingMembers} memberAvatars={currentAvatars} key={index} />
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
          <MotionInputField onSendMessage={sendMessage} />
        ) : (
          <ChatInputField onSendMessage={sendMessage} />
        )}
      </form>
    </Box>
  );
}
