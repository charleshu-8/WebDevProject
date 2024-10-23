import React, { useState } from "react";
import { Avatar, TextField, Button, Box } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import './chat_boxes.css'; // Import the CSS file

const MessageBoxs = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  //set username to "You" by default
  const [userName, setUserName] = useState("You"); 

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentMessage, sender: userName },
      ]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box className="chat-container">
      <Box className="chat-box">
        <ChatBox>
          {messages.map((message, index) =>
            message.sender === userName ? (
              <SenderMessage key={index} avatar={<Avatar>{userName.charAt(0)}</Avatar>}>
                {message.text}
              </SenderMessage>
            ) : (
              <ReceiverMessage key={index} avatar={<Avatar>Bot</Avatar>}>
                {message.text}
              </ReceiverMessage>
            )
          )}
        </ChatBox>

        {/* Input Field and Send Button */}
        <Box className="chat-input">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            className="chat-button"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBoxs;