import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function GestionProfile() {
  const [client, setClient] = useState(null);
  const [idClient, setidClient] = useState();
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
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token);
        try {
          console.log("Decoded token:", decodedToken);
          console.log("Decoded client:", decodedToken.id);

          if (decodedToken.userType === 'proprietaire') {
            setidClient(decodedToken.id_client);
          } else if (decodedToken.userType === 'client') {
            setidClient(decodedToken.id);
            console.log("id_client", decodedToken.id);
          }
        } catch (error) {
          console.error('Failed to verify JWT token:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    async function fetchClient() {
      try {
        console.log('idClient', idClient);
        const response = await fetch(`/api/api_getClient?clientId=${idClient}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClient(data);
          setUpdatedData(data);
        } else {
          console.error('Failed to fetch client:', response.status);
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    }

    fetchClient();
  }, [idClient]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedData(client);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('/api/api_updateClient', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setClient(updatedData);
        setIsEditing(false);
      } else {
        console.error('Failed to update client');
      }
    } catch (error) {
      console.error('Error updating client information:', error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header/>
    <div className="flex-grow p-8">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Gestion de profil</h1>

      {client && !isEditing && (
        <div className="border rounded p-4 bg-gray-300 text-black font-mono">
          <p className="mb-2">Nom: {client.nom}</p>
          <p className="mb-2">Prénom: {client.prenom}</p>
          <p className="mb-2">Email: {client.email}</p>
          <p className="mb-2">Ville: {client.ville}</p>
          <p className="mb-2">Téléphone: {client.telephone}</p>
          <p className="mb-2">Date de naissance: {client.date_naissance}</p>
          <p className="mb-2">Sexe: {client.sex}</p>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            onClick={handleEditClick}
          >
            Modifier le profil
          </button>
        </div>
      )}

      {client && isEditing && (
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
          <label htmlFor="prenom" className="block mb-2">
            Prénom:
            <input
              type="text"
              name="prenom"
              value={updatedData.prenom}
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

      {!client && <p>Chargement des données...</p>}
    </div>

   <Footer/>
  </div>
);
}
