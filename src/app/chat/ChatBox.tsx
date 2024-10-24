import React, { useState } from 'react';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]);
      setCurrentMessage(''); // Clear input after sending
    }
  };

  // Function to handle key press for sending messages
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-box flex flex-col h-full bg-gray-200 p-4">
      <div className="messages-container flex-grow overflow-y-auto bg-white p-4 mb-2">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p> // Placeholder for no messages
        ) : (
          messages.map((message, index) => (
            <p key={index} className="message p-2 bg-blue-500 text-white rounded mb-2">
              {message}
            </p>
          ))
        )}
      </div>
      <div className="input-container flex">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress} // press ENTER key to send message
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Type a message..."
        />
        <button // Add button to send message
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;