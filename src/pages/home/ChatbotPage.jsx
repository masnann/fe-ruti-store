import React, { useState, useRef, useEffect } from "react";
import fetchChatBotResponse from "../../hooks/homepage/ChatBotApi";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userMessageSent, setUserMessageSent] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    
    const welcomeMessage =
      storedMessages.length === 0
        ? [
            { text: "Halo! Nama Saya RutiBot.", sender: "bot" },
            { text: "Saya adalah chatbot yang dapat memberikan tips dan saran seputar dunia fashion.", sender: "bot" },
          ]
        : [];
  
    const initialMessages = [...welcomeMessage, ...storedMessages];
    
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    
    if (initialMessages.length !== messages.length) {
      setMessages(initialMessages);
    }
  }, [messages]); 
  
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, sender: "user" };
      const updatedMessages = [...messages, userMessage];

      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

      setMessages(updatedMessages);
      setNewMessage("");

      try {
        const response = await fetchChatBotResponse(newMessage);

        const botMessage = { text: response.data, sender: "bot" };
        const updatedMessagesWithBot = [...updatedMessages, botMessage];

        localStorage.setItem(
          "chatMessages",
          JSON.stringify(updatedMessagesWithBot)
        );
        console.log("handleSendMessage is running");
        setMessages(updatedMessagesWithBot);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 right-8 bg-white shadow-md p-4 rounded-t-lg w-80 md:w-96 lg:w-1/3 xl:w-1/4">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-lg md:text-xl font-bold">RutiBot</h2>
      </div>
      <div
        ref={messagesContainerRef}
        className="mb-4 max-h-60 md:max-h-72 overflow-y-auto"
        style={{ maxHeight: "400px" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block bg-gray-200 rounded p-3 ${
                message.sender === "user"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik pesan..."
          className="flex-grow p-3 border rounded-l"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-3 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Chat;
