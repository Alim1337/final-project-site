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

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

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

      
    </div>   <Footer /> </div>
    
  );
}
