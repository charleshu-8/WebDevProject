"use client";

import React, { useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { getCommitteeChair } from "@/app/db/committees";
import {
  currentUser,
  getCurrentCommittee,
  getCurrentMotion,
  pb,
} from "@/app/db/pocketbase";
import {
  voted,
  setVoted,
  getMotionDetails,
  voteForMotion,
  voteAgainstMotion,
} from "@/app/db/motions";
// Import the Input component from the MUI Joy library
import Image from "next/image";
import proButton from "@/app/assets/chat/pro_button.svg";
import proButtonPressed from "@/app/assets/chat/pro_button_pressed.svg";
import conButton from "@/app/assets/chat/con_button.svg";
import conButtonPressed from "@/app/assets/chat/con_button_pressed.svg";
import neutralButton from "@/app/assets/chat/neutral_button.svg";
import neutralButtonPressed from "@/app/assets/chat/neutral_button_pressed.svg";
import sendIcon from "@/app/assets/chat/send_icon.svg";
import { Button } from "@mui/material";

interface ChatInputFieldProps {
  onSendMessage: (message: string) => void;
}

// Form component for requesting email for password recovery
export default function ChatInputField({ onSendMessage }: ChatInputFieldProps) {
  // States to track whether each icon is pressed
  const [isProPressed, setIsProPressed] = useState(false);
  const [isConPressed, setIsConPressed] = useState(false);
  const [isNeutralPressed, setIsNeutralPressed] = useState(false);
  const [message, setMessage] = useState(""); // State to track the message input
  const [chair, setChair] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [currentMotion, setCurrentMotion] = useState(getCurrentMotion());

  // Toggle the pro button state
  function handleProClick(): void {
    setIsProPressed(!isProPressed);
    setIsConPressed(false); // Ensure that the con button is not pressed
    setIsNeutralPressed(false); // Ensure that the neutral button is not pressed
  }

  function handleProVote() {
    handleProClick();
    voteForMotion(getCurrentMotion());
  }

  // Toggle the con button state
  function handleConClick(): void {
    setIsConPressed(!isConPressed);
    setIsProPressed(false); // Ensure that the pro button is not pressed
    setIsNeutralPressed(false); // Ensure that the neutral button is not pressed
  }

  function handleConVote(): void {
    handleConClick();
    voteAgainstMotion(getCurrentMotion());
  }

  // Toggle the neutral button state
  function handleNeutralClick(): void {
    setIsNeutralPressed(!isNeutralPressed);
    setIsProPressed(false); // Ensure that the pro button is not pressed
    setIsConPressed(false); // Ensure that the con button is not pressed
  }

  // Hand send button click
  function handleSendClick(): void {
    onSendMessage(message);
    setMessage(""); // Clear the text area after sending the message
  }

  async function handleBeingChair() {
    // setChair(await getCommitteeChair(getCurrentCommittee()));
    console.log(await voted(getCurrentMotion()));
    console.log("something");
  }

  function callVote() {
    if (!hasVoted) {
      checkIfVoted();
    } else {
      setIsConPressed(false);
      setIsProPressed(false);
    }
    setVoted(getCurrentMotion(), true).then(() => {
      setHasVoted(!hasVoted);
    });
  }

  function checkIfVoted() {
    pb.collection("motions")
      .getOne(getCurrentMotion())
      .then((motion) => {
        if (motion.for_vote.includes(currentUser.id)) {
          setIsProPressed(true);
        } else if (motion.against_vote.includes(currentUser.id)) {
          setIsConPressed(true);
        }
      });
  }

  useEffect(() => {
    voted(currentMotion).then((voted) => {
      setHasVoted(voted);
      if (voted) {
        checkIfVoted();
      }
    });
    getCommitteeChair(getCurrentCommittee()).then((chair) => {
      setChair(chair);
    });
  }, [currentMotion]);

  useEffect(() => {
    setCurrentMotion(getCurrentMotion());
    setIsProPressed(false);
    setIsConPressed(false);
    setIsNeutralPressed(false);
    setMessage("");
  }, [getCurrentMotion()]);

  return (
    <>
      {/* Main White Chat Field Input Box Container */}
      <div className="h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-extra-light-gray bg-white">
        {/* Gray Options Bar above chat input field */}

        {hasVoted ? (
          <div className="flex h-1/5 items-center bg-extra-dim-gray pl-6">
            {/* Pro Icon Container */}
            <div className="ml-2 mr-2 flex h-[70%] items-center">
              {/* Pro Button/Icon */}
              <Image
                className="h-full cursor-pointer"
                alt="Pro"
                src={isProPressed ? proButtonPressed : proButton} // Conditionally render the icon
                width="56"
                height="20"
                onClick={handleProVote} // Handle icon click
              />
            </div>
            {/* Con Icon Container */}
            <div className="ml-2 mr-2 flex h-[70%] items-center">
              {/* Con Button/Icon */}
              <Image
                className="h-full cursor-pointer"
                alt="Con"
                src={isConPressed ? conButtonPressed : conButton} // Conditionally render the icon
                width="58"
                height="20"
                onClick={handleConVote} // Handle icon click
              />
            </div>
            {chair === currentUser?.id ? (
              <Button
                variant="contained"
                color=""
                className="ml-2 mr-2 border-2 border-solid p-1"
                style={{ fontSize: "0.5rem" }}
                onClick={() => callVote()}
              >
                Restart discussion
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="flex h-1/5 items-center bg-extra-dim-gray pl-6">
            {/* Pro Icon Container */}
            <div className="ml-2 mr-2 flex h-[70%] items-center">
              {/* Pro Button/Icon */}
              <Image
                className="h-full cursor-pointer"
                alt="Pro"
                src={isProPressed ? proButtonPressed : proButton} // Conditionally render the icon
                width="56"
                height="20"
                onClick={handleProClick} // Handle icon click
              />
            </div>
            {/* Con Icon Container */}
            <div className="ml-2 mr-2 flex h-[70%] items-center">
              {/* Con Button/Icon */}
              <Image
                className="h-full cursor-pointer"
                alt="Con"
                src={isConPressed ? conButtonPressed : conButton} // Conditionally render the icon
                width="58"
                height="20"
                onClick={handleConClick} // Handle icon click
              />
            </div>
            {/* Neutral Icon Container */}
            <div className="ml-2 mr-2 flex h-[70%] items-center">
              {/* Neutral Button/Icon */}
              <Image
                className="h-full cursor-pointer"
                alt="Neutral"
                src={isNeutralPressed ? neutralButtonPressed : neutralButton} // Conditionally render the icon
                width="74"
                height="20"
                onClick={handleNeutralClick} // Handle icon click
              />
            </div>
            {chair === currentUser?.id ? (
              <Button
                variant="contained"
                color=""
                className="ml-2 mr-2 border-2 border-solid p-1"
                style={{ fontSize: "0.5rem" }}
                onClick={() => callVote()}
              >
                Call vote
              </Button>
            ) : null}
          </div>
        )}

        {/*<div className="flex h-1/5 items-center bg-extra-dim-gray pl-6">*/}
        {/*  /!* Pro Icon Container *!/*/}
        {/*  <div className="ml-2 mr-2 flex h-[70%] items-center">*/}
        {/*    /!* Pro Button/Icon *!/*/}
        {/*    <Image*/}
        {/*      className="h-full cursor-pointer"*/}
        {/*      alt="Pro"*/}
        {/*      src={isProPressed ? proButtonPressed : proButton} // Conditionally render the icon*/}
        {/*      width="56"*/}
        {/*      height="20"*/}
        {/*      onClick={handleProClick} // Handle icon click*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  /!* Con Icon Container *!/*/}
        {/*  <div className="ml-2 mr-2 flex h-[70%] items-center">*/}
        {/*    /!* Con Button/Icon *!/*/}
        {/*    <Image*/}
        {/*      className="h-full cursor-pointer"*/}
        {/*      alt="Con"*/}
        {/*      src={isConPressed ? conButtonPressed : conButton} // Conditionally render the icon*/}
        {/*      width="58"*/}
        {/*      height="20"*/}
        {/*      onClick={handleConClick} // Handle icon click*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  /!* Neutral Icon Container *!/*/}
        {/*  <div className="ml-2 mr-2 flex h-[70%] items-center">*/}
        {/*    /!* Neutral Button/Icon *!/*/}
        {/*    <Image*/}
        {/*      className="h-full cursor-pointer"*/}
        {/*      alt="Neutral"*/}
        {/*      src={isNeutralPressed ? neutralButtonPressed : neutralButton} // Conditionally render the icon*/}
        {/*      width="74"*/}
        {/*      height="20"*/}
        {/*      onClick={handleNeutralClick} // Handle icon click*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  {chair === currentUser?.id ? (*/}
        {/*    <Button*/}
        {/*      variant="contained"*/}
        {/*      color=""*/}
        {/*      className="ml-2 mr-2 border-2 border-solid p-1"*/}
        {/*      style={{ fontSize: "0.5rem" }}*/}
        {/*      onClick={() => callVote()}*/}
        {/*    >*/}
        {/*      Call vote*/}
        {/*    </Button>*/}
        {/*  ) : null}*/}
        {/*</div>*/}
        {/* MUI Input with Send Button */}
        <div className="mb-6 ml-7 mr-7 mt-4 flex items-center justify-between">
          {/* MUI Input Component Container*/}
          <div className="m-1 mb-3 w-full">
            {hasVoted ? (
              <Textarea
                name="Textarea"
                placeholder="A vote has been called for this motion. Hit Pro to vote in favor of the motion, hit con to vote against the motion."
                variant="outlined"
                minRows={3}
                maxRows={3}
                size="sm"
                value={message}
                disabled={hasVoted}
                onChange={(e) => setMessage(e.target.value)} // Handle input change
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default behavior of Enter key
                    handleSendClick(); // Trigger send button click
                  }
                }}
              />
            ) : (
              <Textarea
                name="Textarea"
                placeholder="I like this motion because..."
                variant="outlined"
                minRows={3}
                maxRows={3}
                size="sm"
                value={message}
                disabled={hasVoted}
                onChange={(e) => setMessage(e.target.value)} // Handle input change
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default behavior of Enter key
                    handleSendClick(); // Trigger send button click
                  }
                }}
              />
            )}
          </div>
          {/* Send Button/Icon Container*/}
          <div className="ml-2 mr-2 flex h-5/6 cursor-pointer items-center">
            {/* Send Button/Icon */}
            <Image
              className="h-full"
              alt="Send"
              src={sendIcon} // Conditionally render the icon
              width="40"
              height="40"
              onClick={handleSendClick} // Handle icon click
            />
          </div>
        </div>
      </div>
    </>
  );
}
