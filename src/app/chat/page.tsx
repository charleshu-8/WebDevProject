import './page.css';
import SideBar from './sidebar';
import NavBar from './navbar';
import Link from 'next/link';

export default function ChatPage(){
    return(
        <div className="chatpage">
            <NavBar/>
            <SideBar/>
        </div>

        // then add control panel

        //then have chat page content dispalyed here and switched out
        // depending on chat chosen
    
    

    );

}