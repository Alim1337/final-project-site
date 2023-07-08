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
  const [Clientnom, setClientnom] = useState([]);
  const [NegotiationID, setNegotiationID] = useState([]);
  const [bienid, setBienid] = useState([]);
  const [isRDVSet, setIsRDVSet] = useState(false); // Add state for checking if RDV is set
  const [index, setIndex] = useState("");
  const [selectedNegotiationIndex, setSelectedNegotiationIndex] = useState(null);
  const [rdv, setRdv] = useState([]);
  const [hasRdv, setHasRdv] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt.decode(token);
      const proprietaireID = decodedToken.id;
      setProprietaireNom(decodedToken.nom);
  
      console.log('proprietaire id', proprietaireID);
      if (proprietaireID) {
        try {
          const response = await fetch(`/api/api_voir_negotiation_proprietaire?proprietaireID=${proprietaireID}`);
          const data = await response.json();
          const hasRdv = await checkRdvExistence(data.negotiations);
          setHasRdv(hasRdv);
          setNegotiations(data.negotiations);
          console.log(negotiations);
          setBienid(data.negotiation.biens.bien_id);
          console.log("bien id ", bienid);
          setProprietaireID(proprietaireID);
          setClientnom(data.negotiation.Client.nom);
  
          if (hasRdv) {
            console.log('RDV:', rdv);
          }
        } catch (error) {
          console.error('Failed to fetch negotiations:', error);
        }
      } else {
        console.error('Invalid negotiation object:', proprietaireID);
      }
    };
  
    fetchNegotiations();
  }, []);
  
  const checkRdvExistence = async (negotiations) => {
    try {
      const negotiationsWithRdv = [];
      for (const negotiation of negotiations) {
        const response = await fetch(`/api/api_check_rdv_existence?negotiationID=${negotiation.id_negotiation}`);
        const data = await response.json();
  
        if (data.hasRdv) {
          negotiation.rdv = data.rdv; // Add the rdv property to the negotiation object
        }
  
        negotiationsWithRdv.push(negotiation);
      }
      return negotiationsWithRdv;

    } catch (error) {
      console.error('Failed to check RDV existence:', error);
     

      return negotiations; // Return the original negotiations array
    }
  };
  
  const see = async (negotiations) => {
    for (const negotiation of negotiations) {
      console.log("negotiation",negotiation);
      console.log("negotiation.rdv.date_rdv",negotiation.rdv?.date_rdv);

    }
  };
  const dee = see(negotiations);
  
  useEffect(() => {
    console.log('Updated rdv:', rdv);
  }, [rdv]);
  
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
            description : negotiation.description,
           

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
  const handleProposerRendezvous = (negotiationId, index) => {
    setShowDatePicker(true); // Show the date picker
    setNegotiationID(negotiationId); // Set the negotiation ID
    setSelectedNegotiationIndex(index); // Set the index of the negotiation
  };
  
  const handleSubmit = async (negotiation, index) => {
    if (!selectedDate) {
      console.error('Date not selected');
      return;
    }
  
    setShowDatePicker(false);
  
    try {
      console.log('selectedDate',selectedDate);
      console.log('negotiation inside handel submit',negotiation);
      console.log('index',index);

      await handleRdv(selectedDate, negotiation, index);
  
      // Call handleRdv with the selected date, negotiation, and index
      // Optional: Add additional logic or display a success message here
    } catch (error) {
      console.error('Failed to create RDV:', error);
      // Optional: Handle the error or display an error message here
    }
  };
  

  const handleNegotiationChange = (event) => {
    setNegotiation(event.target.value);
  };

  const handleIndexChange = (event) => {
    setIndex(event.target.value);
  };
  useEffect(() => {
    // Check if the RDV is set based on selectedDate
    setIsRDVSet(!!selectedDate);
  }, [selectedDate]);
  
  const handleRdv = async (selectedDate, negotiation, index) => {
    if (!negotiation || index < 0 || index >= negotiations.length) {
      console.error('Invalid negotiation object or index:', negotiation, index);
      return;
    }
  
    console.log('index', index);
  
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const proprietaireID = decodedToken.id;
  
    const N_ID = negotiation.id_negotiation;
    console.log('negotiation id', N_ID);
  
    const C_id = negotiation.client_id;
    console.log('client id', C_id);
  
    const rdvData = {
      date: selectedDate,
      id_client: C_id,
      negotiationID: N_ID,
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
  
      if (response.ok) {
        const rdvData = await response.json();
        setRdv(rdvData); // Update the RDV state with the created RDV data
        toast.success('RDV created!');
      }
  
      if (!response.ok) {
        throw new Error('Failed to create RDV');
      }
    } catch (error) {
      console.error('Failed to create RDV:', error);
      throw error;
    }
  };
  
  
  

  
  const handleDatePickerChange = (event) => {
    setSelectedDate(event.target.value);
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
        className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
      >
        Retourner à proprietaire DashBoard
      </button>
    </div>
    <h1 className="text-2xl font-bold mb-4">
      Négociations pour le proprietaire: {proprietaireNom}
    </h1>
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

              {/* Display RDV information */}
              {negotiation.rdv && negotiation.rdv?.length > 0 && (
  <div className="border-t-2 mt-4 pt-4">
    <p className="text-lg border-b pb-2">RDV Dates:</p>
    {negotiation.rdv.map((rdv, index) => (
      <p key={index} className="text-lg">
        {index + 1}. {rdv.date_rdv}
      </p>
    ))}
  </div>
)}

            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-9 space-x-3">
              <div className="flex space-x-0">
                <button
                  onClick={() => handleAnnuler(negotiation.id_negotiation)}
                  className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                >
                  Annuler
                </button>
                <ToastContainer />

                <button
                  onClick={() => handleValider(negotiation)}
                  className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                >
                  Valider
                </button>

                <button
                  onClick={() => handleContacter(negotiation)}
                  className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                >
                  Contacter
                </button>

                <button
                  onClick={() => handleProposerRendezvous(negotiation.id_negotiation, index)}
                  className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                >
                  Proposer un rendezvous
                </button>
              </div>
            </div>

            {/* Date picker */}
            {showDatePicker && index === selectedNegotiationIndex && (
              <div className="flex space-x-2 mt-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDatePickerChange}
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <button
                  onClick={() => handleSubmit(negotiation, index)}
                  className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p>Aucune négociation trouvée pour le propriétaire.</p>
    )}
  </div>

  <Footer />
</div>


  
  )};
  

export default NegotiationProprietaire;
 