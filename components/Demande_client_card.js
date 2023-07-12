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
        <li className="mb-4">
          <p className="mb-2">
            <span className="font-semibold">Type de bien:</span> {type_bien || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Type de transaction:</span> {type_transaction || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Prix minimum:</span> {prix_minimum || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Prix maximum:</span> {prix_maximum || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Surface minimum:</span> {surface_minimum || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Nombre de chambres minimum:</span> {nbr_chambre_minimum || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Date de début de recherche:</span> {date_debut_recherche || ''}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Statut de la demande:</span> {statut_demande || ''}
          </p>
          <div className="flex items-center">
            <button
              className="inline-block rounded border bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700 mr-2"
              onClick={handleDelete}
            >
              Supprimer
            </button>
   
          </div>
          {showConfirmation && (
            <div className="mt-4">
              <p>Êtes-vous sûr de vouloir supprimer cette demande ?</p>
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
      </ul>
    </div>
  );
};

export default Demande_client_card;
