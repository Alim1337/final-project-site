import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CardHouse from '@/components/CardHouse';

const searchResults = [
  {
    id_biens: 1,
    description: "Description 1",
    type_bien: "Type 1",
    adresse: "Address 1",
    ville: "City 1",
    code_postal: ["Code 1"],
    prix_estime: 100.0,
    etat: "State 1",
    id_proprietaire: 1,
    Proprietaire: "Proprietaire 1",
    biens_loue: [],
    biens_vip: null,
  },
  {
    id_biens: 2,
    description: "Description 2",
    type_bien: "Type 2",
    adresse: "Address 2",
    ville: "City 2",
    code_postal: ["Code 2"],
    prix_estime: 200.0,
    etat: "State 2",
    id_proprietaire: 2,
    Proprietaire: "Proprietaire 2",
    biens_loue: [],
    biens_vip: null,
  },
  // Add more items as needed
];

const HomesList = () => {
  if (!searchResults || searchResults.length === 0) {
    return (
      <div>
        {/* Render appropriate content when searchResults is empty */}
        No search results found.
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <Header />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          {/* Rest of the component JSX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(({
              id_biens,
              description,
              type_bien,
              adresse,
              ville,
              code_postal,
              prix_estime,
              etat,
              id_proprietaire,
              Proprietaire,
              biens_loue,
              biens_vip,
            }) => (
              <CardHouse
                key={id_biens}
                description={description}
                type_bien={type_bien}
                adresse={adresse}
                ville={ville}
                prix_estime={prix_estime}
                etat={etat}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomesList;
