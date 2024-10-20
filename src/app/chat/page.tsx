import SideBar from "./navbar";
import NavBar from "./sidebar";
import {Box} from "@mui/material";

export default function ChatPage() {
  return (
    <Box className="bg-stark-white h-screen w-screen">
          <NavBar />
          <SideBar />
    </Box>
    

    // then add control panel

    //then have chat page content dispalyed here and switched out
    // depending on chat chosen
  );
}
