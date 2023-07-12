import BgLogin from "../components/bg_login";
import Header from "@/components/Header";
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BienFormVip from "@/components/BienFormVIP";

export default function Page() {
  const [BienCompleted, setBienCompleted] = useState(false);
  const router = useRouter();
  const [verifi,setVirifi] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setVirifi(true);
    }
  }, []);
  const handleConnexionClick = () => {
    router.push('/login_client');
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
  };

  async function handleSubmit(
    description,
    typeBien,
    type_location_vip,
    nbrChambre,
    selectedAddress, 
    ville,
    codePostal,
    minPrixEstime,
    etat
  ) {
    const token = localStorage.getItem('token'); // Retrieve the token from storage

    try {
      console.log('Submitting form...');
      console.log('Form data:', {
        description,
    typeBien,
    type_location_vip,
    nbrChambre,
    selectedAddress, 
    ville,
    codePostal,
    minPrixEstime,
    etat
      });

      const response = await fetch('/api/addBienProprietaireVIP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          typeBien,
          type_location_vip,
          nbrChambre,
          selectedAddress, 
          ville,
          codePostal,
          minPrixEstime,
          etat
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        setBienCompleted(true);
        toast.success('Bien ajouté!', {
          position: toast.POSITION.TOP_CENTER,
          
        });router.push(`/Vip`);
      } else {
        const errorMessage = data?.error || 'Error creating user';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error
    }
  }

  return (
    <div>
      <ToastContainer />
      <Header/>
      {verifi ?(
        <div>
      <BgLogin />
      <BienFormVip onSubmit={handleSubmit} />
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
    </div>
  );
}
