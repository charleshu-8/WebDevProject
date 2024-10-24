import SideBar from "./navbar";
import NavBar from "./sidebar";
import { Box } from "@mui/material";
import ChatBox from "./chat_boxes";

export default function ChatPage() {
  return (
    <Box className="h-screen w-screen bg-light-background">
      <NavBar />
      <SideBar />
      <div className="fixed left-[70px] top-[80px] flex h-[89%] w-[93%]">
        <ChatBox />
      </div>
    </Box>

    // then add control panel

    //then have chat page content dispalyed here and switched out
    // depending on chat chosen
  );
}
