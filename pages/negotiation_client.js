import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HiArrowLeft } from "react-icons/hi2";

const NegotiationClient = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [clientName, setClientName] = useState('');
  const [proprietaireID, setProprietaireID] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt.decode(token);
          const userType = decodedToken.userType;
          const clientID = userType === 'proprietaire' ? decodedToken.id_client : decodedToken.id;
          const clientName = decodedToken.nom; // Assuming the name is stored in the token
          setClientName(clientName);
          const res = await fetch(`/api/api_voir_negotiation_client?client_id=${clientID}`);
          const data = await res.json();
          setProprietaireID(data.negotiations[0]?.Proprietaire?.id_proprietaire); // Access the first negotiation object and get the id_proprietaire
          setNegotiations(data.negotiations);
          console.log('data:', data);
        } else {
          router.push('/login'); // Redirect to the login page if the token is not found
        }
      } catch (error) {
        console.error('Failed to fetch negotiations:', error);
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

  const handleContacter = (negotiation) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const userType = decodedToken.userType;
    const clientID = userType === 'proprietaire' ? decodedToken.id_client : decodedToken.id;
    const proprietaireID = negotiation.Proprietaire?.id_proprietaire;
    const negotiationID = negotiation.id_negotiation;

    console.log("this is negotiation object", negotiation);
    console.log("negotiation id", negotiationID);
    console.log("proprietaire id", negotiation.Proprietaire.id_proprietaire);
    console.log("client id", clientID);

    if (proprietaireID && negotiationID) {
      router.push(`/Chat_client?clientId=${clientID}&proprietaireId=${proprietaireID}&negotiationId=${negotiationID}`);
    } else {
      console.error('Invalid negotiation object:', negotiation);
    }
  };


  const handleBackClick = () => {
    router.push('/panel');
  };

  return (
    <div className="bg-white text-black">
    <Header />

    <div className="container min-h-screen mx-auto px-4 py-8">
      <div className="flex justify-start mb-4">
      <button
        onClick={handleBackClick}
        className="text-white text-xl bg-gradient-to-r bg-neutral-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
      >
        <HiArrowLeft />
      </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Négociations pour le client: {clientName}</h1>
      {negotiations && negotiations.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {negotiations.map((negotiation, index) => (
      <div
        key={negotiation.id_negotiation}
        className="bg-gray-100 p-8 rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-gray-300 transition-shadow duration-300 border border-gray-300"
      >
        {/* Display negotiation details */}
        <div className="border-b-2 pb-4">
          <div className="border-b-2 pb-2">
            <p className="text-lg border-b pb-2">
              Négociation ID: {negotiation.id_negotiation}
            </p>
            <p className="text-lg border-b pb-2">
              Prix Proposé: {negotiation.prix_propose}
            </p>
            <p className="text-lg border-b pb-2">Durée: {negotiation.duree}</p>
            <p className="text-lg border-b pb-2">
              Statut:{" "}
              <span
                className={`text-lg ${
                  negotiation.statut === "waiting"
                    ? "text-yellow-500"
                    : negotiation.statut === "validated"
                    ? "text-green-500"
                    : ""
                }`}
              >
                {negotiation.statut}
              </span>
            </p>
          </div>

          {/* Display biens information */}
          <p className="text-lg border-b pb-2">
            Type de bien: {negotiation.biens?.type_bien}
          </p>

          {/* Display Proprietaire information */}
          <div className="border-t-2 mt-4 pt-4">
            <p className="text-lg border-b pb-2">
              Nom du propriétaire: {negotiation.Proprietaire?.nom}
            </p>
            <p className="text-lg">Nom du Client: {negotiation.Client?.nom}</p>
          </div>
        </div>

        {/* Buttons */}
              <div className="flex justify-end mt-4 space-x-4">
                {negotiation.rdv ? (
                  <button
                    onClick={() => handleModifier(negotiation.id_negotiation)}
                    className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Modifier
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAnnuler(negotiation.id_negotiation)}
                      className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                    >
                      Annuler
                    </button>

                    <button
                      onClick={() => handleModifier(negotiation.id_negotiation)}
                      className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                    >
                      Modifier
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleContacter(negotiation)}
                  className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
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

export default NegotiationClient;
