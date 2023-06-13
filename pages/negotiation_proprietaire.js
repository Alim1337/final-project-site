import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import jwt from 'jsonwebtoken';

const NegotiationProprietaire = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [proprietaireName, setProprietaireName] = useState('');
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

  const handleModifierNegotiation = (negotiationId) => {
    // Logic for handling "Modifier la negotiation" button click
  };

  const handleRefuserNegotiation = (negotiationId) => {
    // Logic for handling "Refuser la negotiation" button click
  };

  const handleContacterNegotiation = (negotiationId) => {
    // Logic for handling "Contacter" button click
  };

  const filteredNegotiations = negotiations.filter(
    (negotiation) => negotiation.Proprietaire && negotiation.Proprietaire.nom === proprietaireName
  );

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Negotiations pour le Proprietaire: {proprietaireName}</h1>
        {filteredNegotiations && filteredNegotiations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNegotiations.map((negotiation) => (
              <div
                key={negotiation.id_negotiation}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-350 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <p className="font-semibold">Negotiation ID: {negotiation.id_negotiation}</p>
                <p className="mb-2">Prix Propose: {negotiation.prix_propose}</p>
                <p className="mb-2">Duration: {negotiation.duree}</p>
                <p className="mb-2">Status: {negotiation.statut}</p>

                {negotiation.Proprietaire && (
                  <p className="mb-2">
                    Proprietaire Nom: {negotiation.Proprietaire.nom} 
                  </p>
                )}

                {negotiation.biens && <p className="mb-2">Bien Type: {negotiation.biens.type_bien}</p>}

                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleModifierNegotiation(negotiation.id_negotiation)}
                  >
                    Modifier la negotiation
                  </button>

                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleRefuserNegotiation(negotiation.id_negotiation)}
                  >
                    Refuser la negotiation
                  </button>

                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleContacterNegotiation(negotiation.id_negotiation)}
                  >
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No negotiations found for the Proprietaire.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NegotiationProprietaire;
