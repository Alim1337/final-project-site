import React, { useState, useEffect } from 'react';
import Header_signup from '@/components/Header_signup';
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
  const [type_bien, setTypeBien] = useState('');
  const [prix_minimum, setPrixMinimum] = useState('');
  const [prix_maximum, setPrixMaximum] = useState('');
  const [surface_minimum, setSurfaceMinimum] = useState('');
  const [nbr_chambre_minimum, setNbrChambreMinimum] = useState('');
  const [date_debut_rechercher, setDateDebutRechercher] = useState('');
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
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setDemandeClient(data.demandeClient);
      } else {
        console.error('Failed to fetch demande client');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div>
      <Header_signup />
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
                  className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0 hover:bg-opacity-70 border-opacity-70  border-red-500 active:scale-95 text-s flex items-center gap-x-4 cursor-pointer p-2 ${
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
            <h2 className="text-xl font-bold mb-4">Tu As  {demandeClient.length ? demandeClient.length : ''} Demande Client:</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {demandeClient.map((demande, index) => (
  <div key={index} className="mb-4">
    <Demande_client_card demandeClient={[demande]} cardIndex={index + 1} className="hover:scale-105 transition-all duration-300" />
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
