import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { HiOutlineHome } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoIosHand } from 'react-icons/io';
import jwt from 'jsonwebtoken';
import Footer from '@/components/Footer';
import Demande_client_card_show from '@/components/Demande_client_card_show';
import { HiOutlineCog } from "react-icons/hi2";


export default function AllDemandClient() {
    const [demandeClients, setDemandeClients] = useState([]);
    const [open, setOpen] = useState(true);
    const [verifi,setVirifi] = useState(false);
    const menus = [
      { title: 'Dashboard', icon: HiOutlineHome },
      { title: 'Gestion de profil', icon: HiUser ,button1:true},
      { title: 'Support', icon: FiPlus },
      {
        title: 'Devenir VIP',
        icon: FiChevronDown,
        button: true,
      },
      { title: 'Paramètre', icon: HiOutlineCog },
    ];
  const router = useRouter();
  const [ClientName, setClientName] = useState('');
  const [ClientEmail, setClientEmail] = useState('');
  const [demandeClient, setDemandeClient] = useState([]);
  const [demandeClient_id, setDemandeClient_id] = useState([]);

  const handleModifierProfil= () => {
    router.push('/Gestion_Profile_Proprietaire');
  };

  const handleDevenirVIP = () => {
    setShowVIPWindow(true);
  };
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
    const fetchDemandeClients = async () => {
      try {
        const response = await fetch('/api/api_voir_all_demande_client_vip');
        const data = await response.json();
        
        setDemandeClients(data.demandeClients);
        console.log(demandeClients); // Assuming the API response is an object with a 'negotiations' property
      } catch (error) {
        console.error('Error fetching demandeClients:', error);
      }
    };
  
    fetchDemandeClients();
  }, []);
  

  const handleModifier = (id) => {
    // Handle modification logic
    console.log(`Modifier demande client with ID: ${id}`);
  };

  const handleSupprimer = (id) => {
    // Handle deletion logic
    console.log(`Supprimer demande client with ID: ${id}`);
  };
  const handleIntereser = (id_demande_client) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.id) {
        const requestData = { id_demande_client, decodedTokenId: decodedToken.id ,demandeClients}; // Adjust the data structure as per your API requirements
        const apiUrl = '/api/api_create_like_demande_vip'; // Adjust the API endpoint URL
  
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
            throw new Error('Failed to create like');
          }
          return response.json(); // Parse the response JSON
        })
        .then(interesse => {
          console.log("interesse.id_interesse", interesse.id_interesse);
          router.push(`/negotiation_demande?id_likes=${interesse.id_interesse}`);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        
          // Display a notification with the error message
          // Replace this with your notification logic
          alert('Failed to create like: ' + error.message);
        });
        
      }
    }
  };
  
  return (
   
    <div>
      <Header/>
      {verifi ?(
      <main>
        <div className="flex bg-gray-100 text-gray-700">
        <div className={`${open ? 'w-60' : 'w-20'} h-auto relative bg-red-400`}>
              <FiChevronLeft
                className={`absolute bg-red-400 border-red-400 rounded-full h-7 cursor-pointer 
                -right-3 top-9 w-7 border-2 border-dark-purple transition transform duration-300 ease-out ${
                  open ? 'rotate-180' : ''
                }`}
                onClick={() => setOpen(!open)}
              />
             <ul className={`gap-x-4 space-y-3 pt-6 origin-left items-center font-medium text-xl duration-300 ${!open ? 'flex flex-col' : ''}`}>
              {menus.map((menu, index) => (
              <li
                key={index}
                className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0 hover:bg-opacity-70 
                border-opacity-70  border-red-500 active:scale-95 text-s flex items-center
                 gap-x-4 cursor-pointer p-2 ${
                  !open ? 'transform scaleX(0)' : ''
                } transition transform duration-300 ease-out`}
              >
              {menu.button ? (
                <button className="flex items-center gap-x-2" onClick={handleDevenirVIP}>
                  {React.createElement(menu.icon, { className: 'text-white' })}
                  <span className={`text-white transition transform ${!open ? 'hidden' : ''}`}>
                    {menu.title}
                  </span>
                </button>
                ): null}
              {menu.button1 && (
                <button className="flex items-center gap-x-2" onClick={handleModifierProfil}>
                  {React.createElement(menu.icon, { className: 'text-white' })}
                  <span className={`text-white transition transform ${!open ? 'hidden' : ''}`}>
                    {menu.title}
                  </span>
                </button>
              )}
              {!menu.button && !menu.button1 && (<button className='flex items-center gap-x-2'>
                    {React.createElement(menu.icon, { className: 'text-white' })}
                    <span className={`text-white transition transform ${!open ? 'hidden' : ''}`}>
                      {menu.title}
                    </span>
                  </button>)}
              </li>
            ))}
            </ul>
            </div>
            <div className="p-7 text-2xl text-black font-semibold flex-1 h-full overflow-auto">
              <h2 className="font-bold text-gray-700 text-2xl">il ya  {demandeClients.length ? demandeClients.length : ''} Demande Client:</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {demandeClients.map((demandeClients, index) => (
              <div key={index} className="mb-4">
                <Demande_client_card_show demandeClient={[demandeClients]} cardIndex={index + 1} className="hover:scale-105
                  transition-all duration-300"
                  handleModifier={handleModifier}
                  handleSupprimer={handleSupprimer} 
                  handleIntereser={handleIntereser}/>    
              </div>
            ))}
            </div>
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
      <Footer />
    </div>
  );
}


