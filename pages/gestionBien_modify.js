import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Header from '@/components/Header';
import BgLogin from '@/components/bg_login';

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
    <div>
      <Header/>
      <BgLogin/>
      <h1 className='text-black text-2xl'>Gestion Bien Modify</h1>
      <ul className='text-black text-xl font-mono'>
        {biens.map((bien) => (
          <li key={bien.id_biens}>
            <strong>ID:</strong> {bien.id_biens}<br />
            <strong>Description:</strong> {bien.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
