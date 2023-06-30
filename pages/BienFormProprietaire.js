import BgLogin from "../components/bg_login";
import Header from "@/components/Header";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

import BienForm from "@/components/BienForm";

export default function Page() {
  const [BienCompleted, setBienCompleted] = useState(false);
  const router = useRouter();

  async function handleSubmit(description, type_bien, adresse, ville, code_postal, prix_estime, etat,nbrChambre) {  
    const token = localStorage.getItem('token'); // Retrieve the token from storage

    try {
      const response = await fetch('/api/addBienProprietaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description, type_bien, adresse, ville, code_postal, prix_estime, etat,nbrChambre }),
      });
      
      const data = await response.json();
      console.log('Result:', data);
      
      if (response.ok) {
        setBienCompleted(true);
        toast.success('Bien ajouté!', {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push('/panel');

      } else {
        const errorMessage = data?.error || 'Error creating user';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  }
  
  return (
    <div>
      <ToastContainer />
      <Header/>
      <BgLogin />
      <BienForm onSubmit={handleSubmit} />
    </div>
  );
}
