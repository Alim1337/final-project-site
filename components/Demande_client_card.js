import React, { useState } from 'react';

const Demande_client_card = ({
  demandeClient,
  cardIndex,
  clientName,
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

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleModify = () => {
    handleModifier(id_demande_client);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    handleSupprimer(id_demande_client);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white rounded-lg font-mono shadow-md font-medium my-2 mx-1 hover:shadow-2xl 
    active:scale-90 transition duration-150 p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">Demande Client {clientName}:</h2>
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
            <div className='flex items-center'>
            <button
              className="inline-block  rounded border border-neutral-400 bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
              onClick={() => handleDelete(demande.id_demande_client)}
            >
              Anuller
            </button>
            </div>
            {showConfirmation && (
              <div className="mt-4">
                <p>Êtes-vous sûr de vouloir annuler cette demande ?</p>
                <div className="flex items-center mt-2 space-x-4">
                  <button
                    className="inline-block rounded border bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700"
                    onClick={handleConfirmDelete}
                  >
                    Confirmer
                  </button>
                  <button
                    className="inline-block rounded border bg-gray-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-800 transition duration-150 ease-in-out hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-gray-500"
                    onClick={handleCancelDelete}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demande_client_card;
