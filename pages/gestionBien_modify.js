import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Header from '@/components/Header';
import BgLogin from '@/components/bg_login';
import CardHouseModifier from '@/components/CardHouse_Modifier';
import CardHouseModifiervip from '@/components/CardHouse_Modifier_vip';
import Footer from '@/components/Footer';
import DemandeClientLike from '@/components/CardHouse_for_prop';

export default function GestionBienModify() {
  const [biens, setBiens] = useState([]);
  const [biensVip, setBiensVip] = useState([]);
  const router = useRouter();
  const [idProprietaire, setIdProprietaire] = useState([]);
  const [verifi,setVirifi] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if(token){
      setVirifi(true);
    }
    if (!token) {
      console.log('No token');
    } else {
      try {
        const decodedToken = jwt.decode(token);
        console.log('Decoded token:', decodedToken);
        setIdProprietaire(decodedToken.id);
        if (!decodedToken || !decodedToken.id) {
          console.log('Invalid token or missing id_proprietaire');
        } else {
          fetchBiens(decodedToken.id);
        }
      } catch (error) {
        console.log('Error decoding token:', error);
      }
    }
  }, []);
  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };
  const fetchBiens = async (id_proprietaire) => {
    try {
      const response = await fetch(`/api/api_modifier_bien?id_proprietaire=${id_proprietaire}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { biens, biens_vip } = data;
        setBiens(biens);
        setBiensVip(biens_vip);
        console.log(biens);
        console.log(biensVip);

      } else {
        console.log('Error fetching biens:', response.status);
      }
    } catch (error) {
      console.error('Error fetching biens:', error);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      {verifi ?(<div>
      <h1 className="pl-10 pt-5 font-bold text-gray-700 text-4xl">Gestion Des Biens</h1>
  <div className="container mx-auto py-2">
    <div className="flex justify-between items-center mb-14">
      <div className="grid grid-cols-4 gap-10 px-10 mt-6 text-black">
            
        {biens.map((bien) => (
          <CardHouseModifier
            key={bien.id_biens}
            id_biens={bien.id_biens}
            description={bien.description}
            type_bien={bien.type_bien}
            nbrChambre={bien.nbrChambre}
            adresse={bien.adresse}
            ville={bien.ville}
            code_postal={bien.code_postal}
            prix_estime={bien.prix_estime}
            etat={bien.etat}
            Proprietaire={bien.Proprietaire}
          />
        ))}
        {biensVip.map((bienVip) => (
          <CardHouseModifiervip
            key={bienVip.id_biens}
            id_biens={bienVip.id_biens}
            description={bienVip.description}
            type_bien={bienVip.type_bien}
            nbrChambre={bienVip.nbrChambre}
            type_location_vip={bienVip.type_location_vip}
            adresse={bienVip.adresse}
            ville={bienVip.ville}
            code_postal={bienVip.code_postal}
            prix_estime={bienVip.prix_estime}
            etat={bienVip.etat}
            Proprietaire={bienVip.Proprietaire}
          />
        ))}
      </div>
      </div>

      
    </div></div> ) : (
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
      )}  <Footer /> </div>
    
  );
}
