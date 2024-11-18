"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChatInputField from "./chat-input-form";
import MotionInputField from "./motion-input-form";
import {
  currentUser,
  getCurrentMotion,
  pb,
  setCurrentMotion,
  getCurrentCommittee,
} from "@/app/db/pocketbase";
import { formatDate, getCurrentTime } from "@/app/utils/time";
import { PocketbaseMessage } from "@/app/db/pocketbaseInterfaces";

interface ChatBoxProps {
  isNewMotion: boolean;
  handleToggleIsNewMotion: () => void;
}

interface ChatMessage {
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

  // Ref to keep track of the container for automatic scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  async function helper() {
    const response = await pb.collection("motions").getOne(getCurrentMotion(), {
      expand: "messages",
      $autoCancel: false,
    });

    const helperArray: ChatMessage[] = [];
    response?.expand?.messages.forEach((message: PocketbaseMessage) => {
      const formattedDate = formatDate(message.created);
      helperArray.push({
        text: message.text,
        timestamp: formattedDate,
        owner: message.owner,
        displayName: message.displayName,
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
          motion: getCurrentMotion(),
          displayName: currentUser?.username,
        },
        {
          $autoCancel: false,
        },
      );

      const motion = await pb.collection("motions").getOne(getCurrentMotion(), {
        expand: "messages",
        $autoCancel: false,
      });

      const oldMessages = motion?.expand?.messages;
      const updatedMessages = oldMessages
        ? [...motion?.expand?.messages, newMessage]
        : [newMessage];
      console.log(updatedMessages);

      await pb.collection("motions").update(
        getCurrentMotion(),
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
  //flag is set if messages should be wiped, resetting motion
  function sendMessage(message: string, flag: boolean = false) {
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

      publishMessage(message);
      setCurrentMessage(""); // Clear input after sending
    }
  }

  function sendNewMotion(message: string) {
    if (message.trim()) {
      pb.collection("motions")
        .create(
          {
            title: message,
            commitee: getCurrentCommittee(),
          },
          {
            $autoCancel: false,
          },
        )
        .then((motion) => {
          setCurrentMotion(motion.id);
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
            <Box key={index}>
              {message.owner === currentUser?.id ? (
                <Box key={index} className="mb-4 flex flex-col items-end">
                  {/* Timestamp above the message */}
                  <Typography variant="caption" className="text-gray-400">
                    {message.displayName}
                  </Typography>

                  {/* Message bubble */}
                  <Box className="flex items-center space-x-2">
                    <Box
                      className={"max-w-md rounded bg-blue-500 p-2 text-white"}
                    >
                      {message.text}
                    </Box>
                    <Box
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 font-bold text-white"
                      aria-label="User Icon"
                    >
                      U {/* Optional: Replace 'U' with initials or an emoji */}
                    </Box>
                    {/* Circle Icon for Profile */}
                  </Box>
                </Box>
              ) : (
                <Box key={index} className="mb-4 flex flex-col items-start">
                  {/* Timestamp above the message */}
                  <Typography variant="caption" className="text-gray-400">
                    {message.displayName}
                  </Typography>

                  {/* Message bubble */}
                  <Box className="flex items-center space-x-2">
                    {/* Circle Icon for Profile */}
                    <Box
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 font-bold text-white"
                      aria-label="User Icon"
                    >
                      U {/* Optional: Replace 'U' with initials or an emoji */}
                    </Box>
                    <Box
                      className={"max-w-md rounded bg-gray-300 p-2 text-white"}
                    >
                      {message.text}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
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
