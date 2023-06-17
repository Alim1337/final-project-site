import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const ChatProprietaire = () => {
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
      const response = await fetch(
        `/api/api_messages_modul?negotiationId=${negotiationId}&clientId=${clientId}&proprietaireId=${proprietaireId}`
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await fetch(
        `/api/api_messages_modul?negotiationId=${negotiationId}&clientId=${clientId}&proprietaireId=${proprietaireId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newMessage,
          }),
        }
      );

      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div className="flex flex-col justify-between mx-auto h-full max-w-md">
        {/* Header */}
        <div className="py-4 px-6 border-b-2 border-gray-300 bg-white">
          {/* Header content */}
        </div>
  
        {/* Messages */}
        <div className="flex bg-gray-50 flex-col flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              className={`chat-message ${
                message.sender_id === parseInt(proprietaireId) ? "proprietor-message" : "client-message"
              }`}
              key={message.id_message}
              style={{ border: "1px solid black" }} // Added border style
            >
              {/* Message content */}
              <div className="message-content text-black">{message.content}</div>
              <span className="message-sender text-gray-600">
                {message.sender_id === parseInt(proprietaireId) ? "Proprietaire" : "Client"}
              </span>
            </div>
          ))}
        </div>
  
        {/* Message input */}
        <div className="border-t-2 border-gray-300 px-4 py-2 bg-white">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-500 text-black placeholder-gray-500 pl-4 pr-12 py-3 border border-gray-400 rounded-full shadow-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="absolute right-0 inset-y-0 hidden sm:flex">
              <a
                href="#_"
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
                onClick={sendMessage}
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Send</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }  

export default ChatProprietaire;
