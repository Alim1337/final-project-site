import React, { useState, useEffect } from 'react';
import CardHouse from '../components/CardHouse';
import CardHouseModifiervip from '@/components/CardHouse_Modifier_vip';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import jwt from 'jsonwebtoken';
import { HiArrowLeft } from "react-icons/hi2";

export default function HomesList() {
  const [searchResults, setSearchResults] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Retrieve the token from local storage if running in the browser
  const router = useRouter();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/api_fetch_all_biens');
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);
  
  const handleInterestedClick = async (bienId, proprietaireId) => {
    try {
      const res = await fetch('/api/api_create_like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decodedToken: token,
          bien_id: bienId,
          proprietaire_id: proprietaireId,
        }),
      });
  
      if (res.ok) {
        const like = await res.json();
        // Redirect to the negotiation page with the like ID, bien ID, and proprietaire ID
        router.push(`/negotiation?id_likes=${like.id_likes}&bien_id=${bienId}&proprietaire_id=${proprietaireId}`);
      } else {
        console.error('Failed to create like');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleBackClick = () => {
    try {
      const decodedToken = jwt.decode(token);
      const userType = decodedToken ? decodedToken.userType : null;

      if (userType ) {
        router.back();
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  return (
    <div className="bg-slate-50">
    <Header />
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Home Listings</h2>
        <button
          className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
          onClick={handleBackClick}
        >
          <HiArrowLeft />
        </button>
      </div>
      <div className="grid grid-cols-1 text-black gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.isArray(searchResults) ? (
          searchResults.map((result) => (
            result.biens_vip ? (
              <CardHouseModifiervip
                key={result.bien_vip.id_biens}
                {...result}
                token={token}
              />
            ) : (
              <CardHouse
                key={result.id_biens}
                {...result}
                token={token}
                onInterestedClick={handleInterestedClick}
              />
            )
          ))
        ) : (
          <p>No search results found.</p>
        )}
      </div>
    </div>
  </div>
  
  );
}
