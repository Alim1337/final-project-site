import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HouseCards from '@/components/HouseCards';
import { FiArrowLeft, FiChevronLeft, FiTag, FiSettings, FiHome ,FiPlus, FiUserPlus} from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SideBar from '@/components/Sidebar';

export default function ClientHouses({ exploreData, cardsData }) {
  const router = useRouter()

  return (
    
    <div>
      <Header />
      <main>
        <div className="flex bg-gray-100 text-gray-700">
          <SideBar />

          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
            <h1>Gestion des Immobilier</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-normal text-black">
              <div onClick={() => router.push({
                pathname : "/BienFormPage",
                query : {
                  button1 : "Ajouter",
                  button2 : "Annuler"
                }
              })}>
                <HouseCards key="add-house" img={<FiPlus/>} location="Add a house" />
              </div>
              
                {exploreData?.map((item) => {
                  const { img, distance, location } = item;
                  return <div onClick={() => router.push({
                    pathname : "/BienFormPage",
                    query : {
                      button1 : "Modifier",
                      button2 : "Supprimer"
                    }
                  })}><HouseCards key={img} img={img} location={location}/></div>;
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