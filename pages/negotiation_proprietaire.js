import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NegotiationProprietaire = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [proprietaireID, setProprietaireID] = useState([]);
  const [proprietaireNom, setProprietaireNom] = useState([]);
  const router = useRouter();



  useEffect(() => {
    const fetchNegotiations = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt.decode(token);
      const proprietaireID = decodedToken.id;
      console.log("proprietaire id", proprietaireID);
      if (proprietaireID) {
        try {
          const response = await fetch(`/api/api_voir_negotiation_proprietaire?proprietaireID=${proprietaireID}`);
          const data = await response.json();
          setNegotiations(data.negotiations);
          setProprietaireID(proprietaireID);
          setProprietaireNom(decodedToken.nom);

        } catch (error) {
          console.error('Failed to fetch negotiations:', error);
        }
      } else {
        console.error('Invalid negotiation object:', proprietaireID);
      }
    };

    fetchNegotiations();
  }, []);

  const handleAnnuler = (id) => {
    // Logic for handling 'Annuler' button click
  };

  const handleModifier = (id) => {
    // Logic for handling 'Modifier' button click
  };
  const handleBackClick = () => {
    router.push('/panel');
  };

  const handleContacter = (negotiation) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const proprietaireID = decodedToken.id;
    const clientID = negotiation?.client_id; // Update the property name
    const negotiationID = negotiation?.id_negotiation; // Add null check here
    console.log("negotiation id", negotiationID);
    console.log("proprietaire id", proprietaireID);
    console.log("client id", clientID);
    if (proprietaireID && negotiationID) {
      router.push(`/Chat_proprietaire?clientId=${clientID}&proprietaireId=${proprietaireID}&negotiationId=${negotiationID}`);
    } else {
      console.error('Invalid negotiation object:', negotiation);
    }
  };

  const handleBackToClientHousesClick = () => {
    router.push('/panel');
  };

  const handleBackToProprietaireHousesClick = () => {
    router.push('/panel');
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-start mb-4">
          <button
            onClick={handleBackClick}
            className="text-white bg-gradient-to-r
             from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Retourner à proprietaire DashBoard
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Négociations pour le proprietaire: {proprietaireNom}</h1>
        {negotiations && negotiations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {negotiations.map((negotiation) => (
              <div
                key={negotiation.id_negotiation}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-300 transition-shadow duration-300"
              >
                {/* Display negotiation details */}
                <p className="font-bold text-lg">Négociation ID: {negotiation.id_negotiation}</p>
                {/* Display additional negotiation details */}
                <p className="text-sm">Prix Proposé: {negotiation.prix_propose}</p>
                <p className="text-sm">Durée: {negotiation.duree}</p>
                <p className="text-sm">Statut: {negotiation.statut}</p>

                {/* Display biens information */}
                <p className="text-sm">Type de bien: {negotiation.biens?.type_bien}</p>

                {/* Display Proprietaire information */}
                <p className="text-sm">Nom du propriétaire: {negotiation.Proprietaire?.nom}</p>

                {/* Buttons */}
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => handleAnnuler(negotiation.id_negotiation)}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Annuler
                  </button>

                  <button
                    onClick={() => handleModifier(negotiation.id_negotiation)}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleContacter(negotiation)}
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune négociation trouvée pour le client.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};
export default NegotiationProprietaire;
