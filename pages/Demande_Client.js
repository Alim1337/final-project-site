import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { FaSketch } from "react-icons/fa";
import HouseCards from '@/components/HouseCards';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { HiOutlineHome } from 'react-icons/hi2';
import { HiUser } from 'react-icons/hi2';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoIosHand } from 'react-icons/io';
import jwt from 'jsonwebtoken';
import AjoutCard from '@/components/AjoutCard';
import Form_Demande_Client from '@/components/Form_Demande_Client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineCog } from "react-icons/hi2";

export default function DemandeClient() {
    const router = useRouter();
    const [ClientName, setClientName] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [decodedToken, setDecodedToken] = useState(null); // State variable to store decoded token
    const [open, setOpen] = useState(true);
    const [verifi,setVirifi] = useState(false);
    const token = localStorage.getItem('token');
    let clientId;
    if (token) {
      setVirifi(true);
      const decodedToken = jwt.decode(token);
     
    
      if (decodedToken.userType === 'client') {
        clientId = decodedToken.id;
      } else if (decodedToken.userType === 'proprietaire') {
        clientId = decodedToken.id_client;
      }
    }
    const handleDevenirVIP = () => {
      setShowVIPWindow(true);
    };
    
    const handleModifierBien = () => {
      router.push('/gestionBien_modify');
    };
    const handleModifierProfil= () => {
      router.push('/Gestion_Profile_Proprietaire');
    };
    const handleConnexionClick = () => {
      router.push('/login_client');
    };
  
    const handleSignupClick = () => {
      router.push('/signup_client');
    };
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log("token:",token); // Retrieve the token from local storage
      if (token) {
        const decodedToken = jwt.decode(token);
        let clientId;
      
        if (decodedToken.userType === 'client') {
          clientId = decodedToken.id;
        } else if (decodedToken.userType === 'proprietaire') {
          clientId = decodedToken.id_client;
        }
        console.log("decoded token:",decodedToken)
        if (decodedToken && decodedToken.nom) {
          setClientName(decodedToken.nom);
          setClientEmail(decodedToken.email);
          setDecodedToken(decodedToken); // Store decoded token in state variable
        }
      }
    }, []);
  
    async function handlemSubmit(
      type_bien,
      prix_minimum,
      prix_maximum,
      surface_minimum,
      nbr_chambre_minimum,
      date_debut_rechercher
    ) {
      try {
        const response = await fetch('/api/api_insert_demande_client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({
            type_bien,
            prix_minimum,
            prix_maximum,
            surface_minimum,
            nbr_chambre_minimum,
            date_debut_rechercher,
            id: clientId// Access the id from the decodedToken state variable
          }),
        });
  
        if (response.ok) {
          // Successful submission
          console.log('Demande_client submitted successfully');
          toast.success('Demande_client submitted successfully');
          // Optionally, you can navigate to another page after successful submission
          setTimeout(() => {
            router.push('/panel');
          }, 0);
                  } else {
          // Handle error
          console.error('Failed to submit Demande_client');
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };
  
    const menus = [
      { title: 'Dashboard', icon: HiOutlineHome },
      { title: 'Gestion de profil', icon: HiUser, button1:true}, /* hawlik sbab lmachakil 3ndou function fi ligne 48 ou render fi ligne 187, glhf :) */
      { title: 'Support', icon: FiPlus },
      { title: 'Devenir VIP', icon: FaSketch, button: true},
      { title: 'Paramètre', icon: HiOutlineCog }
    ];
    return (
      <div className=" min-h-screen">
        <Header />
        {verifi ?(
        <main className="">
          <div className="flex bg-white text-gray-700">
            
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
             <div className="flex items-center justify-between">
               <div className="max-w-md w-full p-6 bg-white rounded">
                 <h2 className="text-2xl font-semibold mb-4">Demande Personnalisée</h2>
                 <Form_Demande_Client onSubmit={handlemSubmit} />
                 
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
        
         <ToastContainer />

         <Footer />
       </div>
       );
    }
       