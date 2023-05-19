import React, { useState, useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HouseCards from '@/components/HouseCards';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header_signup from '@/components/Header_signup';
import jwt from 'jsonwebtoken';


/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function ClientHouses({ exploreData, cardsData }) {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: 'Gestion de profil', icon: FiArrowLeft },
    { title: 'Gestion des annonces', icon: FiHome },
    { title: 'Gestion des biens', icon: FiChevronDown },
    { title: 'Support', icon: FiPlus },
    { title: 'Devenir VIP', icon: FiChevronDown },
    { title: 'settings', icon: FiChevronLeft },
  ];
  const router = useRouter();
  const [ClientName, setClientName] = useState('');
  const [ClientEmail, setClientEmail] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setClientName(decodedToken.nom);
        setClientEmail(decodedToken.email);
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
                  className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0
                   hover:bg-opacity-70 border-opacity-70  border-red-500 active:scale-95 text-s f
                   lex items-center gap-x-4 cursor-pointer p-2 ${
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
            <h1 className='font-bold text-gray-700 text-4xl'>Devenir Un Proprietaire</h1>
            <h1>Ajouter au moins un bien pour avoir le statu "Proprietaire" </h1>
            <button className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            font-normal text-black"
            onClick={() => router.push('/BienFormPage')}>
              <HouseCards
                key="Ajouter Un Bien"
                img={<Image src="/photos/add.jpg" alt="Ajouter Un Bien" width={500} height={300} />}
                location="Ajouter Un Bien"
              />
            </button>
          </div>
          <h2 className='font-mono text-gray-500'>Client Connected Name : : {ClientName}</h2>
            <h2 className='font-mono text-gray-500'>Client Connected Email: : {ClientEmail}</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/592I").then((res) => res.json())
  const cardsData = await fetch("https://www.jsonkeeper.com/b/31MI").then((res) => res.json())

  return {
    props: {
      exploreData,
      cardsData
    }
  }
}
