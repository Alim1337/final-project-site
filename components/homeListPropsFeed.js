import React from 'react';
import CardHouse from '@/components/CardHouse';

function HomeListPropsFeed({ searchResults }) {
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
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <div className="h-screen text-black text-xs">
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
    </div>
  );
}

export default HomeListPropsFeed;
