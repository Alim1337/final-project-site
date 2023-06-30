import React, { useState, useEffect } from 'react';
import CardHouse from '../components/CardHouse';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import jwt from 'jsonwebtoken';

export default function HomesListFiltred() {
  const [searchResults, setSearchResults] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/api_rechercher_filtre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: router.query.location,
            address: router.query.address,
            propertyType: router.query.propertyType,
            numBedrooms: router.query.numBedrooms,
          }),
        });
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [router.query]);

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

      if (userType) {
        router.push('/panel');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  useEffect(() => {
    const queryParams = {
      location: router.query.location,
      address: router.query.address,
      propertyType: router.query.propertyType,
      numBedrooms: router.query.numBedrooms,
    };

    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const url = `/homesList_filtred?${queryString}`;
    router.push(url);
  }, [searchResults, router.query]);

  return (
    <div className="bg-slate-50">
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Home Listings</h2>
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl
             focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
             font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
        <div className="grid grid-cols-1 text-black gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((result) => (
              <CardHouse
                key={result.id_biens}
                {...result}
                token={token}
                onInterestedClick={handleInterestedClick}
              />
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
