import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HouseCards from '@/components/HouseCards';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header_signup from '@/components/Header_signup';
import { HiOutlineHome } from 'react-icons/hi2';
import { HiUser } from 'react-icons/hi2';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoIosHand } from 'react-icons/io';
import jwt from 'jsonwebtoken';
import AjoutCard from '@/components/AjoutCard';
import Form_Demande_Client from '@/components/Form_Demande_Client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DemandeClient() {
    const router = useRouter();
    const [ClientName, setClientName] = useState('');
    const [ClientEmail, setClientEmail] = useState('');
    const [decodedToken, setDecodedToken] = useState(null); // State variable to store decoded token
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log("token:",token); // Retrieve the token from local storage
      if (token) {
        const decodedToken = jwt.decode(token);
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
            id: decodedToken?.id // Access the id from the decodedToken state variable
          }),
        });
  
        if (response.ok) {
          // Successful submission
          console.log('Demande_client submitted successfully');
          toast.success('Demande_client submitted successfully');
          // Optionally, you can navigate to another page after successful submission
          setTimeout(() => {
            router.push('/clientHouses');
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
      { title: 'Gestion de profil', icon: HiUser },
      { title: 'Gestion des annonces', icon: FaChalkboardTeacher },
      { title: 'Gestion des biens', icon: HiOutlineHome },
      { title: 'Support', icon: FiChevronDown },
      { title: 'Devenir VIP', icon: FiChevronDown },
      { title: 'settings', icon: IoIosHand },
    ];
    return (
      <div className="flex flex-col min-h-screen">
        <Header_signup />
        <main className="flex-grow">
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
                    className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0
                     hover:bg-opacity-70 border-opacity-70  border-red-500 active:scale-95 text-s f
                     lex items-center gap-x-4 cursor-pointer p-2 ${
                       !open ? 'transform scaleX(0)' : ''
                     } transition transform duration-300 ease-out`}            >
                     {React.createElement(menu.icon, { className: 'text-white' })}
                     <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>
                       {menu.title}
                     </span>
                   </li>
                 ))}
               </ul>
             </div>
             <div className="flex-1 flex items-center justify-center">
               <div className="max-w-md w-full p-6 bg-white rounded shadow">
                 <h2 className="text-2xl font-semibold mb-4">Demande Personnalisée</h2>
                 <Form_Demande_Client onSubmit={handlemSubmit} />
                 
               </div>
             </div>
             <div className="p-20 py-0">
           <h2 className="font-mono text-green-600">Client Connected Name:</h2>
           <h2 className="font-mono text-green-600">{ClientName}</h2>
         </div>
       
         <div className="p-0">
           <h2 className="font-mono text-green-600">Client Connected Email: </h2>
           <h2 className="font-mono text-green-600">{ClientEmail}</h2>
         </div>
           </div>
         
         </main>
        
         <ToastContainer />

         <Footer />
       </div>
       );
    }
       