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


  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setClientName(decodedToken.nom);
        setClientEmail(decodedToken.email);
        fetchDemandeClient(token);
      }
    }
  }, []);

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
  const handleModifier = async (demandeId) => {
    console.log('Modifier clicked for demande ID:', demandeId);
    // Implement your logic to modify the demande with the specified ID
    // Call your API endpoint to handle the modification
  };

  const handleSupprimer = async (demandeId) => {
    console.log('Supprimer clicked for demande ID:', demandeId);
    // Implement your logic to delete the demande with the specified ID
    // Call your API endpoint to handle the deletion
    try {
      const response = await fetch('/api/api_modifier_demande_client', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ demandeId , demandeClient  }),
      });

      if (response.ok) {
        console.log('Demande deleted successfully');
        // Perform any necessary actions after deletion
        // Fetch updated demande clients
        fetchDemandeClient(localStorage.getItem('token'));
      } else {
        console.log('Failed to delete demande');
        // Perform any necessary error handling
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  return (

    <div>
      <Header/>
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
            <ul className={`gap-x-4 space-y-3 pt-6 origin-left font-medium text-xl duration-300`}>
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
    <Demande_client_card demandeClient={[demandeClient]} cardIndex={index + 1} className="hover:scale-105
 transition-all duration-300"
 handleModifier={handleModifier}
 handleSupprimer={handleSupprimer} />

    
  </div>
))}


            </div>
          </div>
        </div>
        <div className="p-20 py-0 bg-gray-50">
          <h2 className="font-mono text-green-600">Client Connected Name:</h2>
          <h2 className="font-mono text-green-600">{ClientName}</h2>
        </div>
        <div className="p-0 bg-gray-50">
          <h2 className="font-mono text-green-600">Client Connected Email: </h2>
          <h2 className="font-mono text-green-600">{ClientEmail}</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}
