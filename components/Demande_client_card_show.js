import React from 'react';

const Demande_client_card_show = ({
  demandeClient,
  cardIndex,
  handleModifier,
  handleSupprimer,
}) => {
  const {
    id_demande_client,
    type_bien,
    type_transaction,
    prix_minimum,
    prix_maximum,
    surface_minimum,
    nbr_chambre_minimum,
    date_debut_recherche,
    statut_demande,
  } = demandeClient;

  const handleInteresr = () => {
    handleInteresr(id_demande_client);
  };
    return (
    <div className="bg-white rounded-lg font-mono shadow-md font-medium my-2 mx-1 hover:shadow-2xl 
    active:scale-90 transition duration-150 p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">Demande Client {cardIndex}:</h2>
      <ul className="list-disc ml-6">
        {demandeClient.map((demande, index) => (
          <li key={index} className="mb-4">
            {/* Display the relevant data from the demande object */}
            <p className="mb-2">
              <span className="font-semibold">Type de bien:</span> {demande.type_bien || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Type de transaction:</span> {demande.type_de_transaction || ''}
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
            <p className="mb-2">
              <span className="font-semibold">Date de fin de recherche:</span> {demande.date_fin_recherche || ''}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Statut de la demande:</span> {demande.statut_demande || ''}
            </p>
            <button
              className="text-blue-500 flex-auto bg-white border border-red-100 
              px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl 
              active:scale-90 transition duration-150"
              onClick={() => handleInteresr(demande.id_demande_client)}
            >
              Je suis interésé
            </button>
            <div className="flex items-center space-x-4"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demande_client_card_show;
