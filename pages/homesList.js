import React, { useState, useEffect } from 'react';
import CardHouse from '../components/CardHouse';
import { useRouter } from 'next/router';

export default function HomesList() {
  const [searchResults, setSearchResults] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Retrieve the token from local storage if running in the browser
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/api_fetch_all_biens');
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleInterestedClick = async (bienId) => {
    try {
      const res = await fetch('/api/api_create_like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decodedToken: token,
          bien_id: bienId,
        }),
      });

      if (res.ok) {
        const like = await res.json();
        // Redirect to the negotiation page
        router.push('/negotiation');
      } else {
        console.error('Failed to create like');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Home Listings</h2>
        <div className="grid grid-cols-1 text-black gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {searchResults.map((result) => (
            <CardHouse
              key={result.id_biens}
              {...result}
              token={token}
              onInterestedClick={handleInterestedClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
