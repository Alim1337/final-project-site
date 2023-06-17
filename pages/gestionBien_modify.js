import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Header from '@/components/Header';
import BgLogin from '@/components/bg_login';
import CardHouseModifier from '@/components/CardHouse_Modifier';
import Footer from '@/components/Footer';
import DemandeClientLike from '@/components/CardHouse_for_prop';

export default function GestionBienModify() {
  const [biens, setBiens] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      console.log('No token');
    } else {
      try {
        const decodedToken = jwt.decode(token);
        console.log('Decoded token:', decodedToken);

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
        setBiens(data.biens);
      } else {
        console.log('Error fetching biens:', response.status);
      }
    } catch (error) {
      console.error('Error fetching biens:', error);
    }
  };
  

  return (
    <div className='bg-white'>
      <Header/>
      <h1 className='text-red-900 text-4xl text-center font-mono '>Gestion Bien Modify</h1>
      <div className="grid grid-cols-3 gap-4 mt-6 text-black ">
        {biens.map((bien) => (
          <CardHouseModifier
            key={bien.id_biens}
            id_biens={bien.id_biens}
            description={bien.description}
            type_bien={bien.type_bien}
            adresse={bien.adresse}
            ville={bien.ville}
            code_postal={bien.code_postal}
            prix_estime={bien.prix_estime}
            etat={bien.etat}
            Proprietaire={bien.Proprietaire}
          />
        ))}
      </div>
      <Footer/>
    </div>
  );
}
