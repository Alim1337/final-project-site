import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HouseCards from '@/components/HouseCards';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header_signup from '@/components/Header_signup';
import { HiOutlineHome } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoIosHand } from 'react-icons/io';
import jwt from 'jsonwebtoken';
import AjoutCard from '@/components/AjoutCard';

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function ClientHouses() {
  const [open, setOpen] = useState(true);
  const [showVIPWindow, setShowVIPWindow] = useState(false);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false); // New state variable

  const menus = [
    { title: 'Gestion de profil', icon: HiUser },
    { title: 'Gestion des annonces', icon: FaChalkboardTeacher },
    { title: 'Gestion des biens', icon: HiOutlineHome },
    { title: 'Support', icon: FiPlus },
    {
      title: 'Devenir VIP',
      icon: FiChevronDown,
      button: true,
    },
    { title: 'settings', icon: IoIosHand },
  ];

  const router = useRouter();
  const [ClientName, setClientName] = useState('');
  const [ClientEmail, setClientEmail] = useState('');
  const [verifi,setVirifi] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      setVirifi(true);
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setClientName(decodedToken.nom);
        setClientEmail(decodedToken.email);
      }
    }
  }, []);
  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };

  const handleGoBack = () => {
    router.push('/');
  };
  const handleDevenirVIP = () => {
    setShowVIPWindow(true);
  };

  const handleJaipaye = () => {
    setShowConfirmationWindow(true); // Show the confirmation window
  };

  const handleConfirmation = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.userType) {
        const requestData = { decodedToken }; // Adjust the data structure as per your API requirements
        const apiUrl = '/api/api_create_vip'; // Adjust the API endpoint URL
  
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then(response => {
            // Check if the response was successful
            if (!response.ok) {
              throw new Error('Failed to create VIP');
            }
  
            // Handle the response as needed
            router.push('/Vip'); // Redirect to "/Vip"
          })
          .catch(error => {
            // Handle the error
            console.error(error);
  
            // Display a notification with the error message
            // Replace this with your notification logic
            alert('Failed to create VIP: ' + error.message);
  
            // Close the window
            setShowConfirmationWindow(false); 
            setShowVIPWindow(false);
            // Show the confirmation window
          });
      }
    }
  };
  return (
    <div>
      <Header />
      {verifi ?(
      <main>
        <div className="flex bg-gray-100 text-gray-700">
          <div className={`${open ? 'w-60' : 'w-20'} h-screen relative bg-red-400`}>
            <FiChevronLeft
              className={`absolute bg-red-400 border-red-400 rounded-full h-7 cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple transition transform duration-300 ease-out ${
                open ? 'rotate-180' : ''
              }`}
              onClick={() => setOpen(!open)}
            />

            <ul className={`gap-x-4 space-y-3 pt-6 origin-left font-medium text-xl duration-300`}>
            {menus.map((menu, index) => (
  <li
    key={index}
    className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0 hover:bg-opacity-70 
    border-opacity-70  border-red-500 active:scale-95 text-s flex items-center gap-x-4 cursor-pointer p-2 ${
      !open ? 'transform scaleX(0)' : ''
    } transition transform duration-300 ease-out`}
  >
    {menu.button ? (
      <button
        className="flex items-center gap-x-2"
        onClick={handleDevenirVIP} // Call the function when the button is clicked
      >
        {React.createElement(menu.icon, { className: 'text-white' })}
        <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>
          {menu.title}
        </span>
      </button>
    ) : (
      <>
        {React.createElement(menu.icon, { className: 'text-white' })}
        <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>
          {menu.title}
        </span>
      </>
    )}
  </li>
))}

              </ul>
            </div>

          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <h1 className="font-bold text-gray-700 text-4xl">Devenir Un Proprietaire</h1>
            <h1 className="font-semi-bold text-green-500">
              Ajouter au moins un bien pour avoir le statut Proprietaire
            </h1>
            <button
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => router.push('/BienFormPage')}
            >
              <AjoutCard key="gestion" text="Ajouter un bien" />
            </button>
            <button
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => router.push('/Demande_Client')}
            >
              <AjoutCard key="gestion" text="Faire Une Demande Personnalisée" />
            </button>
            <button
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => router.push('/Modifier_Demande_Client')}
            >
              <AjoutCard key="gestion" text="Consulter Et Modifier Votre Demandes Personnalisée" />
            </button>
            <button
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => router.push('/homesList')}
            >
              <AjoutCard key="gestion" text="Consulter Les Biens" />
            </button>
            <button
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => router.push('/negotiation_client')}
            >
              <AjoutCard key="gestion" text="Voir Les Negotiations" />
            </button>
          </div>

          <div className="p-20 py-0">
            <h2 className="font-mono text-green-600">Client Connected Name:</h2>
            <h2 className="font-mono text-green-600">{ClientName}</h2>
          </div>
          <div className="p-0">
            <h2 className="font-mono text-green-600">Client Connected Email: </h2>
            <h2 className="font-mono text-green-600">{ClientEmail}</h2>
          </div>

          <div className="flex-grow-0 flex-shrink-0">
            <button
              className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </div>
      </main>
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
      <div>
       {/* VIP Window */}
       {showVIPWindow && (
  <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-75">
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
      <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm font-medium text-gray-600">DevienirVIP</p>
      </div>
      <div className="flex justify-between mt-4">
      <button
  className="text-white bg-gradient-to-r from-green-400 via-green-500
  to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
  focus:ring-green-300 dark:focus:ring-green-800 shadow-lg
  shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80
  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  onClick={handleJaipaye} // Call the handleJaipaye function on button click
>
  Jai payé
</button>

        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500
           to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
            focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg
             dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            setShowVIPWindow(false);
          }}
        >
          Jai pas payé encore
        </button>
      </div>
    </div>
  </div>
)}
 {/* Confirmation Window */}
 {showConfirmationWindow && (
  <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-75">
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
      <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
        {/* Existing code */}
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      </div>
      <div className="text-center">
        {/* Existing code */}
      </div>
      <h1 className="text-black font-semi-bold text-xl mt-4">On considère que le paiement est fait</h1>

      <div className="flex justify-between mt-4">
        
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-500
          to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
          focus:ring-green-300 dark:focus:ring-green-800 shadow-lg
          shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80
          font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={handleConfirmation} // Call the handleConfirmation function on button click
        >
          Oui je suis sûr
        </button>
        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500
          to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
          focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg
          dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => setShowConfirmationWindow(false)} // Close the confirmation window
        >
          Non je ne suis pas sûr
        </button>
        
      </div>
    </div>
  </div>
)}

       </div>

      <Footer />
    </div>
  );
}
