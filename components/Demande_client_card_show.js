import React from 'react';

const Demande_client_card_show = ({
  demandeClient,
  cardIndex,
  handleModifier,
  handleSupprimer,
  handleIntereser,
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

  
    return (
    <div className="bg-white rounded-lg font-mono shadow-md font-medium my-2 mx-1 
    p-6 mb-4">
      <h2 className="block text-lg text-gray-700 font-bold mb-2 pt-2">Demande Client {cardIndex}:</h2>
      <ul className="list-disc ml-6">
        {demandeClient.map((demande, index) => (
          <li key={index} className="mb-4">
            {/* Display the relevant data from the demande object */}
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Type de bien:</span><p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'>{demande.type_bien || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Type de transaction:</span> <p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'>{demande.type_de_transaction || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Prix maximum:</span> <p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'>{demande.prix_maximum || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Surface minimum:</span><p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'> {demande.surface_minimum || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Nombre de chambres minimum:</span><p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'> {demande.nbr_chambre_minimum || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Date de début de recherche:</span><p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'> {demande.date_debut_rechercher || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Date de fin de recherche:</span><p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'> {demande.date_fin_recherche || ''}</p> 
            </p>
            <p className="mb-2">
              <span className="block text-lg text-gray-700 font-bold mb-2 pt-2">Statut de la demande:</span><p className='block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full text-sm'> {demande.statut_demande || ''}</p> 
            </p>
            <button
              className="text-blue-500 flex-auto bg-white border border-red-100 
              px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl 
              active:scale-90 transition duration-150"
              onClick={() => handleIntereser(demande.id_demande_client)}
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
