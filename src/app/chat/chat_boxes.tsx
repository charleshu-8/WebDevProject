"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChatInputField from "./chat_input_form";
import {
  currentUser,
  currentMotion,
  currentCommittee,
  pb,
} from "@/app/pocketbase";
import { help } from "yaml/dist/cli";

// Helper function to get the current time in {HH:MM} format
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const ChatBox: React.FC = () => {
  // State to store messages as objects with text and timestamp
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; owner: string }[]
  >([]);
  const [message, setCurrentMessage] = useState<string>("");

  // Ref to keep track of the container for automatic scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Effect to scroll to the bottom whenever the messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (message: string) => {
    if (message.trim()) {
      // Add message along with timestamp
      const currentTime =
        getCurrentTime() + " " + new Date().toLocaleDateString();
      setMessages([
        ...messages,
        { text: message, timestamp: currentTime, owner: currentUser.id },
      ]);
      setCurrentMessage(""); // Clear input after sending
    }
  };

  async function helper() {
    const retval = await pb.collection("motions").getOne(currentMotion, {
      expand: "messages",
      $autoCancel: false,
    });

    const helperArray = [];
    //console.log(retval);
    //console.log(retval.expand.messages);
    retval.expand.messages.forEach((message) => {
      //console.log(message)
      // console.log(message.owner);
      // console.log(currentUser.id);
      if (message.owner === currentUser.id) {
        console.log("they match");
      }
      const formattedDate = formatDate(message.created);
      helperArray.push({
        text: message.text,
        timestamp: formattedDate,
        owner: message.owner,
      });
    });
    helperArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setMessages(helperArray);
  }

  async function fetchMessages() {
    await helper();
    console.log(messages.length);
    // for (const message of messages) {
    //     console.log(message);
    //   }
    // console.log("done");
  }

  if (currentCommittee && currentMotion) {
    useEffect(() => {
      fetchMessages();
    }, []);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() is 0-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes} ${month}/${day}/${year}`;
  }

  return (
    <Box className="flex h-full w-full flex-col bg-gray-200 p-4">
      {/* Display messages */}
      <Box className="mb-2 flex-grow overflow-y-auto bg-white p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          messages.map((message, index) => (
            <>
              {message.owner === currentUser.id ? (
                <Box key={index} className="mb-4 flex flex-col items-end">
                  {/* Timestamp above the message */}
                  <Typography variant="caption" className="text-gray-400">
                    {message.timestamp}
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
                    {message.timestamp}
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
            </>
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
        <ChatInputField onSendMessage={sendMessage} />
      </form>
    </Box>
  );
};

export default ChatBox;
