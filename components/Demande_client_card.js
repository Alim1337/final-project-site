const Demande_client_card = ({ demandeClient }) => {
  return (
    <div>
      <h2>Demande Client:</h2>
      <ul>
        {demandeClient.map((demande) => (
          <li key={demande.id}>
            {/* Display the relevant data from the demande object */}
            <p>Type de bien: {demande.type_bien || ''}</p>
            <p>Prix minimum: {demande.prix_minimum || ''}</p>
            <p>Prix maximum: {demande.prix_maximum || ''}</p>
            <p>Surface minimum: {demande.surface_minimum || ''}</p>
            <p>Nombre de chambres minimum: {demande.nbr_chambre_minimum || ''}</p>
            <p>Date de début de recherche: {demande.date_debut_rechercher || ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};




export default Demande_client_card;
