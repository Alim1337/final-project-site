import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();
  const { negotiationId, clientId, proprietaireId } = router.query;

  useEffect(() => {
    if (negotiationId) {
      fetchMessages();
    }
  }, [negotiationId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/api_messages_modul?negotiationId=${negotiationId}&clientId=${clientId}&proprietaireId=${proprietaireId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await fetch(`/api/api_messages_modul?negotiationId=${negotiationId}&clientId=${clientId}&proprietaireId=${proprietaireId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-400">
      <Header/>
      <div className="flex items-center justify-between py-3 px-6 border-b-2 border-gray-200 bg-white">
        {/* Header content */}
      </div>

      {/* Messages */}
      <div
        id="messages"
        className="flex flex-col flex-1 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message) => (
          <div
            className={`chat-message ${
              message.sender_id === parseInt(clientId) ? "client-message" : "proprietor-message"
            }`}
            key={message.id_message}
          >
            {/* Message content */}
            <div className="message-content">{message.content}</div>
            <span className="message-sender">
              {message.sender_id === parseInt(clientId) ? "Client" : "Proprietor"}
            </span>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="border-t-2 border-gray-200 px-4 py-2 bg-white">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 pr-12 py-3 border border-gray-300 rounded-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="absolute right-0 inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
              onClick={sendMessage}
            >
              {/* Send button content */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;