"use client";
import SideBar from "./navbar";
import NavBar from "./sidebar";
import {Box} from "@mui/material";
import ChatInputField from "./chat_input_form";
import {useEffect} from "react";
import {pb, currentUser} from "@/pocketbase";

let messages = [];


export default function ChatPage() {




  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await pb.collection("messages").getList(1, 100, {
          sort: "created",
          expand: "owner",
          $autoCancel: false,
        });
        messages = result.items;
        console.log(result);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    for (const message of messages) {
      console.log(message.text);
    }
  }, []);



  return (
    <Box className="bg-light-background dark:bg-dark-secondary h-screen w-screen flex">
      <NavBar/>
      <Box id="chat-horizontal-container" className="relative top-[80px] flex flex-row w-screen h-[calc(100%-80px)]">
        <SideBar />
        <Box className="discussion-content relative flex justify-center w-full min-w-[65vw] h-full">
          {/*everything in discussion forum will go below here*/}
          <Box className="absolute bottom-0 w-[80%] h-auto p-4 m-2 rounded-md">

            <ChatInputField/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}