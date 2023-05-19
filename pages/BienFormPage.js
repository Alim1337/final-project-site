import BgLogin from "../components/bg_login";
import Header_signup from "@/components/Header_signup";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BienForm from "@/components/BienForm";

export default function Page() {
  const [BienCompleted, setBienCompleted] = useState(false);

  async function handleSubmit(description, type_bien, adresse, ville, code_postal, prix_estime, etat) {  
    const token = localStorage.getItem('token'); // Retrieve the token from storage

    try {
      const response = await fetch('/api/addBien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description, type_bien, adresse, ville, code_postal, prix_estime, etat }),
      });
      
      const data = await response.json();
      console.log('Result:', data);
      
      if (response.ok) {
        setBienCompleted(true);
        toast.success('Signup completed!', {
          position: toast.POSITION.TOP_CENTER,
        });
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
      <Header_signup/>
      <BgLogin />
      <BienForm onSubmit={handleSubmit} />
    </div>
  );
}
