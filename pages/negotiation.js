import React from 'react';
import FormNegotiation from '../components/FormNegotiation';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Negotiation() {
  const router = useRouter();

  const handleNegotiationSubmit = async (formData) => {
    try {
      // Make an API request to create the negotiation
      const response = await fetch('/api/create_negotiation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the negotiation was created successfully, redirect to the negotiation details page
        const data = await response.json();
        const negotiationId = data.id_negotiation;
        router.push(`/negotiation/${negotiationId}`);
      } else {
        // Handle the error case
        console.error('Failed to create negotiation');
      }
    } catch (error) {
      console.error('Failed to create negotiation:', error);
    }
  };

  return (
    <div className=' bg-white items-center'>
    <Header/>
   <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-sm">
      <div className='bg-white'> 
      <h1 className="text-2xl font-bold  text-black mb-4">Negotiation Page</h1>
      <FormNegotiation onSubmit={handleNegotiationSubmit} />
    </div>
    </div>
    <Footer/>

    </div>
  );
}
