import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NegotiationClient = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [clientName, setClientName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt.decode(token);
          const clientID = decodedToken.id;
          const clientName = decodedToken.nom; // Assuming the name is stored in the token
          console.log("client id ", decodedToken.id);
          console.log("client name ", decodedToken.nom);
          setClientName(clientName);
          const res = await fetch(`/api/api_voir_negotiation_client?client_id=${clientID}`);
          const data = await res.json();
          setNegotiations(data.negotiations);
        } else {
          router.push('/login'); // Redirect to login page if token is not found
        }
      } catch (error) {
        console.error('Failed to fetch negotiations:', error);
      }
    };

    fetchNegotiations();
  }, []);

  return (
    <div className='bg-white text-black min-h-screen'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Negotiations pour le client: {clientName}</h1>
        {negotiations && negotiations.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {negotiations.map((negotiation) => (
              <div key={negotiation.id} className='bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                {/* Display negotiation details */}
                <p className='font-bold'>Negotiation ID: {negotiation.id_negotiation}</p>
                {/* Display additional negotiation details */}
                <p>Prix Propose: {negotiation.prix_propose}</p>
                <p>Duration: {negotiation.duree}</p>
                <p>Status: {negotiation.statut}</p>

                {/* Display biens information */}
                <p>Bien Type: {negotiation.biens?.type_bien}</p>

                {/* Display Proprietaire information */}
                <p>Proprietaire Nom: {negotiation.Proprietaire?.nom}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No negotiations found for the client.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NegotiationClient;
