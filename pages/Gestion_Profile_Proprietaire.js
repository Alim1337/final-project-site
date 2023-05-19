import { useEffect, useState } from 'react';

export default function GestionProfileProprietaire() {
  const [proprietaire, setProprietaire] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    nom: '',
    prenom: '',
    email: '',
    ville: '',
    telephone: '',
    date_naissance: '',
    sex: '',
  });

  useEffect(() => {
    async function fetchProprietaire() {
      try {
        // Fetch proprietaire data from your backend or API
        const response = await fetch('/api/api_profil_proprietaire');
        const data = await response.json();
        setProprietaire(data);
        setUpdatedData(data);
      } catch (error) {
        console.error('Error fetching proprietaire data:', error);
      }
    }

    fetchProprietaire();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedData(proprietaire);
  };

  const handleSaveClick = async () => {
    try {
      // Send updatedData to your backend or API to update the profile information
      await fetch('your-update-api-endpoint', {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setProprietaire(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile information:', error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Gestion de profil</h1>

      {proprietaire && !isEditing && (
        <div className="border rounded p-4 bg-gray-300 text-black font-mono">
          <p className="mb-2">Nom: {proprietaire.nom}</p>
          <p className="mb-2">Prénom: {proprietaire.prenom}</p>
          <p className="mb-2">Email: {proprietaire.email}</p>
          <p className="mb-2">Ville: {proprietaire.ville}</p>
          <p className="mb-2">Téléphone: {proprietaire.telephone}</p>
          <p className="mb-2">Date de naissance: {proprietaire.date_naissance}</p>
          <p className="mb-2">Sexe: {proprietaire.sex}</p>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            onClick={handleEditClick}
          >
            Modifier le profil
          </button>
        </div>
      )}

      {proprietaire && isEditing && (
        <div className="border rounded p-4 bg-gray-300 text-black font-mono">
          <label htmlFor="nom" className="block mb-2">
            Nom:
            <input
              type="text"
              name="nom"
              value={updatedData.nom}
              onChange={handleInputChange}
              className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
            />
          </label>
          <label htmlFor="Prenom" className="block mb-2">
          Prénom:
            <input
              type="text"
              name="Prenom"
              value={updatedData.Prenom}
              onChange={handleInputChange}
              className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
            />
          </label>
          <label htmlFor="email" className="block mb-2">
          Email:
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
              className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
            />
          </label>
          <label htmlFor="ville" className="block mb-2">
          Ville:
            <input
              type="text"
              name="ville"
              value={updatedData.ville}
              onChange={handleInputChange}
              className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
            />
          </label>
          <label htmlFor="telephone" className="block mb-2">
          Téléphone:
            <input
              type="text"
              name="telephone"
              value={updatedData.telephone}
              onChange={handleInputChange}
              className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
            />
          </label>
          
          <label htmlFor="date_naissance" className="block mb-2">
          Date de naissance:
            <input
              type="date"
              name="date_naissance"
              value={updatedData.date_naissance}
              onChange={handleInputChange}
              className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
            />
          </label>
          <label htmlFor="sex" className="block mb-2">
                    Sexe:
                    <select
                  name="sex"
                   value={updatedData.sex}
                onChange={handleInputChange}
                  className="border border-gray-400 rounded px-2 py-1 mt-1 w-full"
                 >
                     <option value="">Sélectionner</option>
                    <option value="Homme">Homme</option>
                         <option value="Femme">Femme</option>
                      </select>
              </label>

          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              onClick={handleSaveClick}
            >
              Sauvegarder
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCancelClick}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {!proprietaire && <p>Chargement des données...</p>}
    </div>
  );
}
