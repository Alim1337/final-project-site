import React from 'react';

const Demande_client_card = ({ demandeClient, cardIndex }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Demande Client {cardIndex}:</h2>
      <ul className="list-disc ml-6">
        {demandeClient.map((demande, index) => (
          <li key={index} className="mb-4">
            {/* Display the relevant data from the demande object */}
            <p className="mb-2">
              <span className="font-semibold">Type de bien:</span> {demande.type_bien || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Prix minimum:</span> {demande.prix_minimum || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Prix maximum:</span> {demande.prix_maximum || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Surface minimum:</span> {demande.surface_minimum || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Nombre de chambres minimum:</span> {demande.nbr_chambre_minimum || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date de début de recherche:</span> {demande.date_debut_rechercher || ''}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demande_client_card;
