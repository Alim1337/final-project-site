import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/router';
import GestionCard from '@/components/CardGestion';
import AjoutCard from '@/components/AjoutCard';
import DemandeClientCard from '@/components/DemandeClientCard';
import { HiOutlineHome } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosHand } from "react-icons/io";
import jwt from 'jsonwebtoken';

export default function VipPnel({ exploreData, cardsData }) {
  const [open, setOpen] = useState(true);
  const [showVIPWindow, setShowVIPWindow] = useState(false);
  const menus = [
    { title: 'Gestion de profil', icon: HiUser },
    { title: 'Gestion des annonces', icon: FaChalkboardTeacher },
    { title: 'Gestion des biens', icon: HiOutlineHome },
    { title: 'Support', icon: FiPlus },
    { title: 'Settings', icon: IoIosHand },
  ];

  const router = useRouter();

  const handleModifierBien = () => {
    router.push('/gestionBien_modify');
  };

  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded && decoded.userType === 'proprietaire') {
        setDecodedToken(decoded);
      }
    }
  }, []);

  const handleDevenirVIP = () => {
    setShowVIPWindow(true);
  };

  const handleJaipaye = () => {
    router.push('/Vip');
  };

  const handleVoirNegotiation = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.userType === 'client') {
        router.push('/negotiation_client');
      } else if (decodedToken && decodedToken.userType === 'proprietaire') {
        router.push('/negotiation_proprietaire');
      }
    }
  };

  const handleVoirDemandes = () => {
    router.push('/Voir_Demandes');
  };

  return (
    <div>
      <Header />
      <div>
        <main>
          <div className="flex bg-gray-100 text-gray-700">
            <div className={`${open ? 'w-60' : 'w-20'} h-screen relative bg-red-400`}>
              <FiChevronLeft
                className={`absolute bg-red-400 border-red-400 rounded-full h-7 cursor-pointer 
                -right-3 top-9 w-7 border-2 border-dark-purple transition transform duration-300 ease-out ${
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
              <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Biens</h1>
              {decodedToken && decodedToken.userType === 'proprietaire' && (
                <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={() => router.push('/BienFormProprietaire')}>
                  <AjoutCard key="gestion" text="Ajouter un bien" />
                </button>
              )}
              {decodedToken && decodedToken.userType === 'client' && (
                <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={() => router.push('/devenir_proprietaire')}>
                  Devenir propriétaire
                </button>
              )}
              {decodedToken && decodedToken.userType === 'proprietaire' && (
                <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={handleModifierBien}>
                  <GestionCard key="gestion" text="Modifier un bien" />
                </button>
              )}
              {decodedToken && decodedToken.userType === 'client' && (
                <button
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => router.push('/Modifier_Demande_Client')}
                >
                  <AjoutCard key="gestion" text="Voir Votre Biens Aimé" />
                </button>
              )}
            </div>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen">
              <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Annonces</h1>
              <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={handleVoirDemandes}>
                <DemandeClientCard key="gestion" text="Voir Les Demandes Des Clients" />
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
              
              {decodedToken && (
                <button
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => handleVoirNegotiation()}
                >
                  <AjoutCard key="gestion" text="Voir Les Negotiations" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      <div>
      </div>
      <Footer />
    </div>
  );
}

