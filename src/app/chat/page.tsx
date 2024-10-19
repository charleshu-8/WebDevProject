import SideBar from "./navbar";
import NavBar from "./sidebar";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="bg-stark-white">
      <NavBar />
      <SideBar />
    </div>

    // then add control panel

    //then have chat page content dispalyed here and switched out
    // depending on chat chosen
  );
}
