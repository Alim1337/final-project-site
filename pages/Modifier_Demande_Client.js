import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { FiChevronLeft, FiHome, FiChevronDown, FiPlus ,FiArrowLeft} from 'react-icons/fi';
import { useRouter } from 'next/router';
import { HiOutlineHome } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoIosHand } from 'react-icons/io';
import jwt from 'jsonwebtoken';
import Footer from '@/components/Footer';
import Demande_client_card from '@/components/Demande_client_card';

export default function ModifierDemandeClient(props) {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: 'Gestion de profil', icon: HiUser },
    { title: 'Gestion des annonces', icon: FaChalkboardTeacher },
    { title: 'Gestion des biens', icon: HiOutlineHome },
    { title: 'Support', icon: FiPlus },
    { title: 'Devenir VIP', icon: FiChevronDown },
    { title: 'settings', icon: IoIosHand },
  ];

  const router = useRouter();
  const [ClientName, setClientName] = useState('');
  const [ClientEmail, setClientEmail] = useState('');
  const [demandeClient, setDemandeClient] = useState([]);
  const [demandeClient_id, setDemandeClient_id] = useState([]);
  const [verifi,setVirifi] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      setVirifi(true);
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setClientName(decodedToken.nom);
        setClientEmail(decodedToken.email);
        fetchDemandeClient(token);
      }
    }
  }, []);

  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };

  const fetchDemandeClient = async (token) => {
    try {
      const response = await fetch('/api/api_get_demande_client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token,demandeClient}),
      });

      if (response.ok) {
        const data = await response.json();
        setDemandeClient(data.demandeClient);
       setDemandeClient_id(data.demandeClient[0].id_demande_client);

        console.log("i am demandeClient",demandeClient);
        console.log("i am demandeClient id",demandeClient_id);

      } else {
        console.error('Failed to fetch demande client');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  const handleModifier = async (demandeClient_id) => {
    console.log('Modifier clicked for demande ID:', demandeClient_id);
    // Implement your logic to modify the demande with the specified ID
    // Call your API endpoint to handle the modification
  };

  const handleSupprimer = async (id_demande_client) => {
    console.log({id:JSON.stringify(id_demande_client)});

    try {
      await fetch(`/api/api_supprimer_demande?id=${id_demande_client}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify( {id:id_demande_client}), 
        // Use { id_client } instead of id_client
      });
      // Refresh the clients data after deletion
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Header/>
      {verifi ?(
      <main>
        <div className="flex bg-gray-100 text-gray-700">
          <div className={`${open ? 'w-60' : 'w-20'} h-screen relative bg-red-400`}>
            <FiChevronLeft
              className={`absolute bg-red-400 border-red-400 rounded-full h-7 
              cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple transition 
              transform duration-300 ease-out ${
                open ? 'rotate-180' : ''
              }`}
              onClick={() => setOpen(!open)}
            />
            <ul className={`gap-x-4 space-y-3 pt-6 origin-left font-medium text-xl h-full duration-300`}>
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0
                   hover:bg-opacity-70 border-opacity-70  border-red-500 active:scale-95 text-s 
                   flex items-center gap-x-4 cursor-pointer p-2 ${
                    !open ? 'transform scaleX(0)' : ''
                  } transition transform duration-300 ease-out`}
                >
                  {React.createElement(menu.icon, { className: 'text-white' })}
                  <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-7 text-2xl text-black font-semibold flex-1 h-screen overflow-auto">
            <h2 className="text-3xl font-mono mb-4">Tu As  {demandeClient.length ? demandeClient.length : ''} Demande Client:</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {demandeClient.map((demandeClient, index) => (
            <div key={index} className="mb-4">
              <Demande_client_card
                demandeClient={demandeClient}
                clientName={ClientName}
                handleModifier={handleModifier}
                handleSupprimer={handleSupprimer}
              />
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
