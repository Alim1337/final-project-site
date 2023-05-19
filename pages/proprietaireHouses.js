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
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosHand } from "react-icons/io";
import jwt from 'jsonwebtoken';

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
        export default function ProprietaireHouses({ exploreData, cardsData }) {
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

  const handleModifierBien = () => {
    router.push('/ModifierBienProprietaire');
  };

  const [proprietaireName, setProprietaireName] = useState('');
  const [proprietaireEmail, setProprietaireEmail] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setProprietaireName(decodedToken.nom);
        setProprietaireEmail(decodedToken.email);
      }
    }
  }, []);

  return (
    <div>
      <Header_signup />
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
                  {React.createElement(menu.icon, { className: 'text-white' })}
                  <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Biens</h1>
          
            <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={() => router.push('/BienFormProprietaire')}>
              <AjoutCard key="gestion" text="Ajouter un bien" />
            </button>
            <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={handleModifierBien}>
              <GestionCard key="gestion" text="Modifier un bien" />
            </button>
          </div>
          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <h1 className="font-bold text-gray-700 text-4xl">Gestion Des Annonces</h1>
            <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black" onClick={handleModifierBien}>
              <DemandeClientCard key="gestion" text="Voir Les Demandes Des Clients" />
            </button>
          </div>
          <div className='p-20 py-0'>  <h2 className='font-mono text-green-600'>Proprietaire Connected Name:</h2>
          <h2 className='font-mono text-green-600'>
           {proprietaireName}</h2></div>
        <div className='p-0'>           <h2 className='font-mono text-green-600'>Proprietaire Connected Email: </h2>

           <h2 className='font-mono text-green-600'>{proprietaireEmail}</h2></div>

     
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://www.jsonkeeper.com/b/592I').then((res) => res.json());
  return {
    props: {
      exploreData,
    },
  };
}
