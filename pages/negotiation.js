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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      try {
        console.log("Decoded token:", decodedToken);
        console.log("Decoded client:", decodedToken.id);
      } catch (error) {
        console.error('Failed to verify JWT token:', error);
      }
    }
  }, []);

  const handleNegotiationSubmit = async (formData) => {
    try {
      // Make an API request to create the negotiation
      const response = await fetch('/api/api_create_negotiation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the negotiation was created successfully, display a notification and redirect to the /ClientHouses page
        toast.success('Negociation a ete faite');
        router.push('/homesList');
      } else {
        // Handle the error case
        console.error('Failed to create negotiation');
      }
    } catch (error) {
      console.error('Failed to create negotiation:', error);
    }
  };

  return (
    <div className='bg-white items-center'>
       
      <Header />
      <div className="container mx-auto px-4 py-8 bg-white rounded-sm">
        <div className='bg-white'>
          <h1 className="text-2xl text-center font-bold text-black mb-4">Negotiation Page</h1>
          <FormNegotiation onSubmit={handleNegotiationSubmit} />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
