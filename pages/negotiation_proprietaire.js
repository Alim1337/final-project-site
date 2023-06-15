import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import jwt from 'jsonwebtoken';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NegotiationProprietaire = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [proprietaireName, setProprietaireName] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      try {
        const res = await fetch('/api/api_voir_negotiation_proprietaire');
        const data = await res.json();
        setNegotiations(data.negotiations);
      } catch (error) {
        console.error('Failed to fetch negotiations:', error);
      }
    };

    fetchNegotiations();

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setProprietaireName(decodedToken.nom);
      }
    }
  }, []);

  const handleModifierNegotiation = (id_negotiation) => {
    // Logic for handling "Modifier la negotiation" button click
  };

  const handleRefuserNegotiation = (id_negotiation) => {
    // Logic for handling "Refuser la negotiation" button click
  };

  const handleContacterNegotiation = (id_negotiation) => {
    setShowInput(true);
  };

  const handleSendMessage = async (id_negotiation) => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt.decode(token);
      const senderId = decodedToken && decodedToken.id;

      const negotiation = filteredNegotiations.find((negotiation) => negotiation.id_negotiation === id_negotiation);

      if (negotiation && negotiation.client_id) {
        const receiverId = negotiation.client_id;

        try {
          const response = await fetch('/api/api_contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_negotiation,
              senderId,
              receiverId,
              content: messageContent,
            }),
          });

          if (response.ok) {
            console.log('Message sent successfully');
            toast.success('Message sent successfully');
          } else {
            console.error('Message sending failed with status:', response.status);
            toast.error('Failed to send message');
          }
        } catch (error) {
          console.error('Failed to send message:', error);
          toast.error('Failed to send message');
        }
      } else {
        console.error('Negotiation or client_id is undefined');
        toast.error('Failed to send message');
      }
    }
  };

  const filteredNegotiations = negotiations.filter(
    (negotiation) => negotiation.Proprietaire && negotiation.Proprietaire.nom === proprietaireName
  );

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
  
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Négociations pour le Propriétaire: {proprietaireName}</h1>
        {filteredNegotiations && filteredNegotiations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNegotiations.map((negotiation) => (
              <div
                key={negotiation.id_negotiation}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-2">{negotiation.biens.description}</h2>
                <p className="text-lg mb-2">
                  <strong>Prix Proposé:</strong> {negotiation.prix_propose}
                </p>
                <p className="text-lg mb-2">
                  <strong>Durée:</strong> {negotiation.duree}
                </p>
                <p className="text-lg mb-2">
                  <strong>Commentaire:</strong> {negotiation.commentaire}
                </p>
                {showInput ? (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Message"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      className="bg-white border border-gray-300 rounded py-2 px-3 mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-1"
                      onClick={() => handleSendMessage(negotiation.id_negotiation)}
                    >
                      Envoyer
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <button
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-base px-6 py-3 mr-2 mb-2"
                      onClick={() => handleModifierNegotiation(negotiation.id_negotiation)}
                    >
                      Modifier la négociation
                    </button>
                    <button
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-base px-6 py-3 mr-2 mb-2"
                      onClick={() => handleRefuserNegotiation(negotiation.id_negotiation)}
                    >
                      Refuser la négociation
                    </button>
                    <button
                      className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-base px-6 py-3 mr-2 mb-2"
                      onClick={() => handleContacterNegotiation(negotiation.id_negotiation)}
                    >
                      Contacter
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune négociation trouvée.</p>
        )}
      </div>
  
      <ToastContainer />
      <Footer />
    </div>
  );
  
};

export default NegotiationProprietaire;
