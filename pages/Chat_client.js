import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [Pnom, setPnom] = useState([]);

  const [content, setContent] = useState('');

  const router = useRouter();
  const { clientId, proprietaireId, negotiationId } = router.query;
  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/api_messages_modul?negotiationId=${negotiationId}`);
      const data = await res.json();
      setMessages(data.messages);
      setPnom(data.Pnom)
     
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    if (negotiationId) {
      fetchMessages();
    }
  }, [negotiationId]);

  const handleBackClick = () => {
    router.push(`/negotiation_client`);
  };

  const handleSendMessage = async () => {
    try {
      const url = `/api/api_messages_modul`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          proprietaireId,
          clientId,
          negotiationId,
        }),
      });
      const data = await res.json();
      console.log('Message sent:', data);
      // Clear message input
      setContent();
      // Fetch updated messages
      fetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  let  currentUserId = clientId;
  console.log(currentUserId);
  const getSenderName = (clientId, proprietaireId, currentUserId) => {
    if (clientId || proprietaireId === currentUserId) {
      return 'You';
    }
    return clientId === proprietaireId ? 'Proprietaire' : 'Client';
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-start mb-4">
        <div className="flex justify-start mb-4">
          <button
            onClick={handleBackClick}
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
          >
            Retourner 
          </button>
        </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Négotiation avec: {Pnom}</h1>
        {messages && messages.length > 0 ? (
  <div className="border border-gray-300 p-4 rounded">
    {messages.map((message) => (
      <div key={message.id} className="mb-4">
        <p className="text-sm font-bold">
          {getSenderName(message.senderId, message.receiverId, clientId)}
        </p>
        <p className="text-xl font-semibold">{message.content}</p>
        <p className="text-xl text-gray-500">{message.timestamp}</p>
      </div>
    ))}
  </div>
) : (
  <p className="border border-gray-300 p-4 rounded">Aucun message trouvé.</p>
)}


        <div className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Écrire un message..."
            rows={4}
          ></textarea>
        </div>
        <div className="mt-2">
          <button
            onClick={handleSendMessage}
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
          >
            Envoyer
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatClient;
