// FloatingButton.js
import React, { useState } from 'react';
import ChatbotPage from '../../pages/home/ChatbotPage';
import { FaRobot } from "react-icons/fa";

const FloatingButton = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full"
        onClick={toggleChatbot}
      >
        <FaRobot size={30} />
      </button>
      {showChatbot && <ChatbotPage />}
    </div>
    
  );
};

export default FloatingButton;
