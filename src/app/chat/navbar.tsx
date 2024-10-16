import { Button } from '@mui/material';
import './navbar.css';

export default function navbar(){
    return (
        <div className="navbar">
            <div className="title-container">
                <h1>Team Slackers</h1>
            </div>
            <div className="profile-button-container">
                <Button className="profile-button">

                </Button>
            </div>
        </div>
        

    );
}