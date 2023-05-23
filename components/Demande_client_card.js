import React from 'react';

const FormInformation = ({ type_bien, prix_minimum, prix_maximum, surface_minimum, nbr_chambre_minimum, date_debut_rechercher }) => {
  // Component logic and JSX here

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Demande Client</h2>
      <p>Type de bien: {type_bien}</p>
      <p>Prix minimum: {prix_minimum}</p>
      <p>Prix maximum: {prix_maximum}</p>
      <p>Surface minimum: {surface_minimum}</p>
      <p>Nombre de chambres minimum: {nbr_chambre_minimum}</p>
      <p>Date de début de recherche: {date_debut_rechercher}</p>
    </div>
  );
};

export default FormInformation;
