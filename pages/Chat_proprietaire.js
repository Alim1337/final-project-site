import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ChatProprietaire = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const router = useRouter();
  const { clientId, proprietaireId, negotiationId } = router.query;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/api_messages_modul_proprietaire?negotiation_id=${negotiationId}`);
        const data = await res.json();
        setMessages(data);
        console.log('data:', data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    if (negotiationId) {
      fetchMessages();
    }
  }, [negotiationId]);

  const handleBackClick = () => {
    router.push(`/negotiation_proprietaire`);
  };

  const handleSendMessage = async () => {
    try {
      const url = `/api/api_messages_modul_proprietaire?negotiation_id=${negotiationId}&sender_id=${proprietaireId}&receiver_id=${clientId}&content=${encodeURIComponent(messageText)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('Message sent:', data);
      // Clear message input
      setMessageText('');
      // Fetch updated messages
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/api_messages_modul_proprietaire?negotiationId=${negotiationId}&clientId=${clientId}&proprietaireId=${proprietaireId}`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      };    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getSenderName = (sender_Id, receiver_Id, currentUser_Id) => {
    if (receiver_Id === currentUser_Id) {
      return 'Client';
    }
    return sender_Id === proprietaireId ? 'you' : 'You';
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-start mb-4">
          <button
            onClick={handleBackClick}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Retourner à Négociations
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Négociation ID: {negotiationId}</h1>
        {messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id_message}>
                <p className="text-sm font-bold">
                  {getSenderName(message.sender_id, message.receiver_id, proprietaireId)}
                </p>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun message trouvé.</p>
        )}

        <div className="mt-4">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Écrire un message..."
            rows={4}
          ></textarea>
        </div>
        <div className="mt-2">
          <button
            onClick={handleSendMessage}
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Envoyer
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatProprietaire;
