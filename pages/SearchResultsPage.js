import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

import searchResults from './api/Data_searchResults';

import CardHouse from '@/components/CardHouse';

const SearchResultsPage = ({ searchResults }) => {
  const router = useRouter();
  const { location } = router.query;

  console.log(searchResults); // Add this console.log statement

  return (
    <div className="bg-slate-50">
      <Header />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <div className="h-screen text-black text-xs">
            <h1 className="text-3xl font-semibold mb-6">{location}</h1>
            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="button">Type</p>
              <p className="button">Price</p>
              <p className="button">Filters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(({ id_biens, imageURL, ville, type_bien, description, star, prix_estime, total }) => (
              <CardHouse
                key={id_biens}
                img={imageURL}
                location={ville}
                title={type_bien}
                description={description}
                star={star}
                price={prix_estime}
                total={total}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
