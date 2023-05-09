import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HouseCards from '@/components/HouseCards';
import { FiArrowLeft, FiChevronLeft, FiHome, FiChevronDown, FiPlus } from 'react-icons/fi';
import Image from 'next/image';

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

  return (
    <div>
      <Header />
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

          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <h1>Manage My Houses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black">
              <HouseCards key="add-house" img={<FiPlus />} location="Add a house" />
              {exploreData?.map((item) => {
                const { img, distance, location } = item;
                return <HouseCards key={img} img={<Image src={img} alt="house image" width={300} height={200} />} location={location} />;
              })}
            </div>
          </div>
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