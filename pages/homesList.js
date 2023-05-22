import { useState, useEffect } from 'react';
import CardHouse from '../components/CardHouse';
import Header_signup from '@/components/Header_signup';

export default function HomesList() {
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div className='bg-slate-50'>
   <Header_signup/>

    <div className="container mx-auto py-8 ">
      <h2 className="text-2xl font-bold mb-4 text-black">Home Listings</h2>
      {searchResults.length === 0 ? (
        <p className="text-gray-500">No search results found.</p>
      ) : (
        <div className="grid grid-cols-1  text-black
        gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {searchResults.map((result) => (
            <CardHouse key={result.id_biens} {...result} />
          ))}
        </div>
      )}
    </div>
    </div>

  );
}
