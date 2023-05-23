import React, { useState } from 'react';

const Form_Demande_Client = ({ onSubmit }) => {
  const [type_bien, setType_bien] = useState('');
  const [prix_minimum, setPrixMinimum] = useState('');
  const [prix_maximum, setPrixMaximum] = useState('');
  const [surface_minimum, setSurfaceMinimum] = useState('');
  const [nbr_chambre_minimum, setNbrChambreMinimum] = useState('');
  const [date_debut_rechercher, setDateDebutRechercher] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [date_fin_recherche, setDateFinRecherche] = useState('');

  
  function handleSubmit(event) {
    event.preventDefault();
        onSubmit(
        type_bien,
        prix_minimum,
        prix_maximum,
        surface_minimum,
        nbr_chambre_minimum,
   
      date_debut_rechercher,
    );
   
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">Demande Personnalisée</h2>
      <form 
      id="form"
      onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="type_bien" className="block font-medium mb-2">
            Type de bien
          </label>
          <select
            id="type_bien"
            value={type_bien}
            onChange={(e) => setType_bien(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">-- Choisissez --</option>
            <option value="appartement">Appartement</option>
            <option value="villa">Villa</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="prix_minimum" className="block font-medium mb-2">
            Prix minimum
          </label>
          <input
            type="number"
            id="prix_minimum"
            value={prix_minimum}
            onChange={(e) => setPrixMinimum(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="prix_maximum" className="block font-medium mb-2">
            Prix maximum
            </label>
            <input
            type="number"
            id="prix_maximum"
            value={prix_maximum}
            onChange={(e) => setPrixMaximum(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="surface_minimum" className="block font-medium mb-2">
            Surface minimum (optionnel)
            </label>
            <input
            type="number"
            id="surface_minimum"
            value={surface_minimum}
            onChange={(e) => setSurfaceMinimum(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="nbr_chambre_minimum" className="block font-medium mb-2">
            Nombre de chambres minimum
            </label>
            <input
            type="number"
            id="nbr_chambre_minimum"
            value={nbr_chambre_minimum}
            onChange={(e) => setNbrChambreMinimum(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            
            </div>
            <div className="mb-4">
            <label htmlFor="date_fin_recherche" className="block font-medium mb-2">
            Date de fin de recherche (optionnel)
            </label>
            <input
            type="date"
            id="date_fin_recherche"
            value={date_fin_recherche}
            onChange={(e) => setDateFinRecherche(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
            </button>
            </form>
            </div>
            );
            };
            
            export default Form_Demande_Client;