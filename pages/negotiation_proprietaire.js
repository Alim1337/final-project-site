import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NegotiationProprietaire = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [proprietaireID, setProprietaireID] = useState([]);
  const [proprietaireNom, setProprietaireNom] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ClientID, setClientID] = useState([]);
  const [NegotiationID, setNegotiationID] = useState([]);
  const [bienid,setBienid] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt.decode(token);
      const proprietaireID = decodedToken.id;
      console.log('proprietaire id', proprietaireID);
      if (proprietaireID) {
        try {
          const response = await fetch(`/api/api_voir_negotiation_proprietaire?proprietaireID=${proprietaireID}`);
          const data = await response.json();
          setNegotiations(data.negotiations);
          setBienid(data.negotiation.biens.id_biens);
          console.log("bien id " ,bienid);
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
  const handleValider = async (negotiation) => {
    console.log(negotiation);
    try {
      if (!negotiation) {
        throw new Error('Invalid negotiation:', negotiation);
      }
  
      const bienId = negotiation.biens ? negotiation.biens.id_biens : null;
      console.log("bien id ", bienId);
  
      if (!bienId) {
        throw new Error('Invalid bien_id:', bienId);
      }
  
      // Create a new biens_loue entry
      const response = await fetch('/api/api_valider_negotiation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          negotiationId: negotiation.id_negotiation,
          biensData: {
            id_biens: bienId,
            id_client: negotiation.client_id,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to validate negotiation');
      }
  
      const data = await response.json();
      // Optional: Add additional logic or display a success message here
  
      // Show a toast notification for success
      toast.success('Negotiation validated successfully');
    } catch (error) {
      console.error('Failed to validate negotiation:', error);
      // Optional: Handle the error or display an error message here
      // Show a toast notification for error
      toast.error('Failed to validate negotiation');
    }
  };
  
  const handleBackClick = () => {
    router.push('/panel');
  };
  
  const handleContacter = (negotiation) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const proprietaireID = decodedToken.id;
    const clientID = negotiation.client_id;
    const negotiationID = negotiation.id_negotiation;
  
    console.log("this is negotiation object", negotiation);
    console.log("negotiation id", negotiationID);
    console.log("proprietaire id", proprietaireID);
    console.log("client id", clientID);
  
    if (proprietaireID && clientID && negotiationID) {
      router.push(`/Chat_proprietaire?clientId=${clientID}&proprietaireId=${proprietaireID}&negotiationId=${negotiationID}`);
    } else {
      console.error('Invalid negotiation object:', negotiation);
    }
  };
  const handleSubmit = async () => {
    if (!selectedDate) {
      console.error('Date not selected');
      return;
    }
  
    setShowDatePicker(false);
    try {
      await handleRdv(selectedDate, negotiations);
      console.log('selectedData',selectedDate);
      console.log('negotiations',negotiations);

      // Call handleRdv with the selected date and negotiations
      // Optional: Add additional logic or display a success message here
    } catch (error) {
      console.error('Failed to create RDV:', error);
      // Optional: Handle the error or display an error message here
    }
  
  
  };
  
  const handleRdv = async (selectedDate, negotiations) => {
    if (!negotiations || negotiations.length === 0) {
      console.error('Invalid negotiation object:', negotiations);
      return;
    }
  
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const proprietaireID = decodedToken.id;
    const negotiation = negotiations[0]; // Access the first negotiation in the array
    const rdvData = {
      date: selectedDate,
      clientID: negotiation.client_id,
      negotiationID: negotiation.id_negotiation,
      proprietaireID: proprietaireID,
    };
  
    try {
      const response = await fetch('/api/api_create_rdv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rdvData),
      });
      if (!response.ok) {
        throw new Error('Failed to create RDV');
      }
    } catch (error) {
      console.error('Failed to create RDV:', error);
      throw error;
    }
  };
  

  

  
  const handleDatePickerChange = (e) => {
    setSelectedDate(e.target.value);
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
                  <ToastContainer />

                  <button
  onClick={() => handleValider(negotiation)}
  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
>
  Valider
</button>


                  <button
                    onClick={() => handleContacter(negotiation)}
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Contacter
                  </button>

                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="text-white bg-gradient-to-r from-gray-400 via-green-200 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Proposer un rendezvous
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune négociation trouvée pour le client.</p>
        )}
      </div>

      {showDatePicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Choisissez une date</h2>
            <input
              type="date"
              className="border-gray-300 border p-2 mb-4"
              value={selectedDate}
              onChange={handleDatePickerChange}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Valider
              </button>
              <button
                onClick={() => setShowDatePicker(false)}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NegotiationProprietaire;
