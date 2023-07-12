import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import FormNegotiation from '../components/FormNegotiation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Negotiation() {
  const router = useRouter();
  const { query } = router;
  const idLikes = query.id_likes || null; // Assign null as the default value if id_likes is not available
  const bien_id = query.bien_id || null;
  const idProprietaire = query.proprietaire_id || null;
  const [idClient, setidClient] = useState('');
  const [verifi,setVirifi] = useState(false);


  const handleGoBack = () => {
    router.back();
  };
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      setVirifi(true);
      try {
        console.log("Decoded token:", decodedToken);
        console.log("Decoded client:", decodedToken.id);
  
        if (decodedToken.userType === 'proprietaire') {
          setidClient(decodedToken.id_client);
        } else if (decodedToken.userType === 'client') {
          setidClient(decodedToken.id);
          console.log("id_client",idClient);
        }
  
      } catch (error) {
        console.error('Failed to verify JWT token:', error);
      }
    }
  }, []);
  
  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };
  const handleNegotiationSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token); // Add the idLikes, idBien, and idProprietaire to the form data
        formData.id_likes = idLikes;
        formData.bien_id = bien_id;
        formData.proprietaire_id = idProprietaire;
        formData.client_id = idClient;
        formData.decodedToken = decodedToken;
  
        // Make an API request to create the negotiation
        const response = await fetch('/api/api_create_negotiation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          // If the negotiation was created successfully, display a notification and redirect to the /homesList page
          toast.success('Negociation a ete faite');
          router.push('/homesList');
        } else {
          // Handle the error case
          console.error('Failed to create negotiation');
        }
      }
    } catch (error) {
      console.error('Failed to create negotiation:', error);
    }
  };
  

  return (
    <div className="bg-white items-center">
    <Header />
      {verifi ?(
    <div className="container mx-auto px-4 min-h-screen py-8 bg-white rounded-sm">
      <div className="bg-white">
        <h1 className="text-2xl text-center font-bold text-black mb-4">Page de négociation </h1>
        <FormNegotiation onSubmit={handleNegotiationSubmit} />
        
      </div>
    </div>
    ) : (
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
      )}
    <Footer />
    <ToastContainer />
  </div>
  );
}
