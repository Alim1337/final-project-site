import React, { useState } from 'react';

const Form_Demande_Client = ({ onSubmit }) => {
  const [type_bien, setType_bien] = useState('');
  const [prix_minimum, setPrixMinimum] = useState('');
  const [prix_maximum, setPrixMaximum] = useState('');
  const [surface_minimum, setSurfaceMinimum] = useState('');
  const [nbr_chambre_minimum, setNbrChambreMinimum] = useState('');
  const [date_debut_rechercher, setDateDebutRechercher] = useState(new Date().toISOString().slice(0, 10));
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
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded p-6 shadow">
      <form id="form" onSubmit={handleSubmit}>
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
          <select
            id="nbr_chambre_minimum"
            value={nbr_chambre_minimum}
            onChange={(e) => setNbrChambreMinimum(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">-- Choisissez --</option>
            <option value="F1">F1</option>
            <option value="F2">F2</option>
            <option value="F3">F3</option>
            <option value="F4">F4</option>
            <option value="F5">F5</option>
            <option value="F6">F6</option>
            <option value="F7">F7</option>
            <option value="F8">F8</option>
            <option value="F9">F9</option>
            <option value="F10">F10</option>
            <option value="F11">F11</option>
            <option value="F12">F12</option>
          </select>
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
        <button type="submit" className="text-white justify-center bg-red-400 
        flex-auto border border-red-100 px-2 py-1 font-mono shadow-md rounded-full 
        font-medium my-2 mx-auto hover:shadow-2xl active:scale-90 transition duration-150 text-sm">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form_Demande_Client;
