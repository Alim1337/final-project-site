import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import jwt from 'jsonwebtoken';

const ChatClient = () => {
    const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState(''); 
   const [Pnom, setPnom] = useState([]);
   const [clientName, setClientName] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [verifi,setVirifi] = useState(false);
  const { clientId, proprietaireId, negotiationId } = router.query;

  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setVirifi(true);
    }
    const decodedToken = jwt.decode(token);
    setClientName(decodedToken.nom);
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
      const url = `/api/api_messages_modul?negotiation_id=${negotiationId}&clientName=${clientName}&sender_id=${proprietaireId}&receiver_id=${clientId}&content=${encodeURIComponent(messageText)}`;
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
          const url = `/api/api_messages_modul?negotiation_id=${negotiationId}&sender_id=${proprietaireId}&receiver_id=${clientId}&content=${encodeURIComponent(messageText)}`;
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      };    } catch (error) {
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
      {verifi ?(
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
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Écrire un message..."
            rows={10}
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
      ) : (
        <div className='flex flex-col items-center place-content-center text-6xl font-bold text-gray-800 bg-white h-screen w-full'>
          <p>Veuiller vous connecter</p>
          <div className="flex mt-10 space-x-4">
          <button
            className="inline-block rounded border border-neutral-400 bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            onClick={handleConnexionClick}
          >
            Connecter
          </button>
          <button
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
            onClick={handleSignupClick}
          >
            Créer un compte
          </button>
        </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ChatClient;
