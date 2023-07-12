import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/router';
import GestionCard from '@/components/CardGestion';
import Header_signup from '@/components/Header_signup';
import AjoutCard from '@/components/AjoutCard';
import DemandeClientCard from '@/components/DemandeClientCard';
import { HiOutlineHome } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineCog } from "react-icons/hi2";
import jwt from 'jsonwebtoken';
import { IoIosHand } from "react-icons/io";
import DemandeUsersCard from '@/components/demande_client_users_card';
import NegotiationCard from '@/components/negotiation_card';
import SearchCard from '@/components/SearchCard';
import EcrireDemande from '@/components/ecrire_card';
import ModifyCard from '@/components/modify_card';

export default function VipPnel({ exploreData, cardsData }) {
  const [open, setOpen] = useState(true);
  const [showVIPWindow, setShowVIPWindow] = useState(false);
  const [verifi,setVirifi] = useState(false);
  const menus = [
    { title: 'Gestion de profil', icon: HiUser, route: '/Gestion_Profile_Proprietaire' },
    { title: 'Gestion des annonces', icon: FaChalkboardTeacher },
    { title: 'Gestion des biens', icon: HiOutlineHome },
    { title: 'Support', icon: FiPlus },
    { title: 'Settings', icon: IoIosHand },
  ];
  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };

  const router = useRouter();

  const handleModifierBien = () => {
    router.push('/gestionBien_modify');
  };

  const [decodedToken, setDecodedToken] = useState(null);
  const [userType, setUserType] = useState(null); // Added userType state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      setVirifi(true);
        setDecodedToken(decoded);
        setUserType(decoded.userType); // Set userType based on decoded token

    
    }
  }, []);

  const handleVoirNegotiationBien = () => {

        router.push('/negotiation_proprietaire_VIP');
  
  };
  const handleVoirNegotiationP = () => {

    
        router.push('/negotiation_client');
    
      
    
  };
console.log(userType);
  const handleVoirDemandes = () => {
    router.push('/see_demande_client');
  };
  const handleVoirDemandes_vip = () => {
    router.push('/see_demande_client_vip');
  };
  
  
  return (
    <div>
      <Header />
      <div>
      {verifi ?(
        <main>
          <div className="flex bg-gray-100 text-gray-700">
            <div className={`${open ? 'w-60' : 'w-20'} h-auto relative bg-red-400`}>
              <FiChevronLeft
                className={`absolute bg-red-400 text-white border-red-400 rounded-full h-7 cursor-pointer 
                -right-3 top-9 w-7 border-2 border-dark-purple transition transform duration-300 ease-out ${
                  open ? 'rotate-180' : ''
                }`}
                onClick={() => setOpen(!open)}
              />
              <ul className={`gap-x-4 space-y-3 px-5 pt-6 origin-left items-center font-medium text-xl duration-300 ${!open ? 'flex flex-col' : ''}`}>
                {menus.map((menu, index) => (
                  <li
                    key={index}
                    className={`rounded text-gray hover:border bg-red-500 bg-opacity-0 hover:bg-opacity-70 
                    border-opacity-70  border-red-500 active:scale-95 text-s flex items-center
                     gap-x-4 cursor-pointer p-2 ${
                      !open ? 'transform scaleX(0)' : ''
                    } transition transform duration-300 ease-out`}
                    onClick={() => menu.route ? router.push(menu.route) : null}
                  >
                    {menu.button ? (
                      <button
                        className="flex items-center gap-x-2"
                        onClick={handleDevenirVIP} // Call the function when the button is clicked
                      >
                        {React.createElement(menu.icon, { className: 'text-white' })}
                        <span className={`text-white transition transform ${!open ? 'hidden' : ''}`}>
                          {menu.title}
                        </span>
                      </button>
                    ) : (
                      <>
                        {React.createElement(menu.icon, { className: 'text-white' })}
                        <span className={`text-white transition transform ${!open ? 'hidden' : ''}`}>
                          {menu.title}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
 <div className='grid grid-cols-3'>
            <div className="mt-5 ml-5 text-2xl font-semibold flex flex-col h-screen">
              <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Biens</h1>
              {userType=== 'client' && (
                <div>
                <p className=' text-red-1000 text-sm'>* ajouter au moin un bien pour devenir proprietaire</p>
                <button className="text-left sm:grid-cols-2 lg:grid-cols-3
                xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                 transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent w-full" 
                 onClick={() => router.push('/BienFormProprietaire')}>
                <AjoutCard key="gestion" text="Ajouter un bien" />
                </button>
                </div>                
              )}
                  {userType === 'proprietaire' && (
      <>
        <button className="text-left  sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                 transform hover:scale-105 hover:cursor-pointer 
                 font-mono bg-transparent" onClick={() => router.push('/BienFormProprietaire')}>
          <AjoutCard key="gestion" text="Ajouter un bien" />
        </button>

        <button className="text-left  sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                 transform hover:scale-105 hover:cursor-pointer 
                 font-mono bg-transparent" onClick={() => router.push('/BienFormProprietaireVIP')}>
          <AjoutCard key="gestion" text="Ajouter un bien VIP" />
        </button>
      </>
    )}
     <button 
                className="text-left sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent" 
                onClick={() => router.push('/homesListVIP')}>
                <SearchCard key="gestion" text="Consulter les biens VIP"/>
              </button>
             {userType === 'proprietaire' && (
                <button className="text-left  sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                 transform hover:scale-105 hover:cursor-pointer 
                 font-mono bg-transparent" onClick={handleModifierBien}>
                  <GestionCard key="gestion" text="Modifier un bien" />
                </button>
              )}

        
               
                
              <button 
                className="text-left sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent" 
                onClick={() => router.push('/homesList')}>
                <SearchCard key="gestion" text="Consulter les biens"/>
              </button>
             
            </div>
       
            <div className="mt-5 ml-5 text-2xl font-semibold flex flex-col h-screen">
              <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Négotiations</h1>
              {userType === 'proprietaire' && (
                     <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 
                  xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                   transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => handleVoirNegotiationBien()}
                >
                  <NegotiationCard key="gestion" text="Negotiations sur votre biens" />
                </button>       
                )}
              <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 
                  xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                   transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => handleVoirNegotiationDemandeClient()}
                >
                  <NegotiationCard key="gestion" text="Negotiations sur votre demandes client" />
                </button>  
                <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 
                  xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                   transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => handleVoirNegotiationP()}
                >
                  <NegotiationCard key="gestion" text="Negotiations avec les proprietaires" />
                </button>
            
                     {userType === 'proprietaire' && (
                     <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 
                  xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                   transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => handleVoirNegotiationDemande()}
                >
                  <NegotiationCard key="gestion" text="Negotiations sur les demandes des clients" />
                </button>       
                )}
                
              </div>
              <div className="p-7 text-2xl font-semibold h-screen flex flex-col">
              <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Annonces</h1>
                <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                   text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 
                   hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => router.push('/Demande_Client')}
                >
                  <EcrireDemande key="gestion" text="Faire Une Demande Personnalisée" />
                </button>
                <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                   text-gray-690 transition duration-300 ease-in-out transform hover:scale-105 
                   hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => router.push('/Demande_Client_vip')}
                >
                  <EcrireDemande key="gestion" text="Faire Une Demande Personnalisée VIP" />
                </button>
                <button
                  className="text-left sm:grid-cols-2 lg:grid-cols-3 
                  xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
                   transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
                  onClick={() => router.push('/Modifier_Demande_Client')}
                >
                  <ModifyCard key="gestion" text="Consulter Et Modifier Votre Demandes Personnalisée" />
                </button>
              
                {userType === 'proprietaire' && (
              <button className="text-left sm:grid-cols-2 lg:grid-cols-3 
              xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
               transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => handleVoirDemandes()}              >
                <DemandeUsersCard key="gestion" text="Voir Les Demandes Des Clients" />
              </button> 
            
               )}
 {userType === 'proprietaire' && (
              <button className="text-left sm:grid-cols-2 lg:grid-cols-3 
              xl:grid-cols-4 text-gray-690 transition duration-300 ease-in-out
               transform hover:scale-105 hover:cursor-pointer font-mono bg-transparent"
              onClick={() => handleVoirDemandes_vip()}              >
                <DemandeUsersCard key="gestion" text="Voir Les Demandes Des Clients VIP" />
              </button> 
            
               )}
               
                  
             
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
      </div>

   
      <Footer />
    </div>
  );
}

