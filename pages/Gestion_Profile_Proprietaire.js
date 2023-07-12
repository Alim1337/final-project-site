import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function GestionProfile() {
  const [client, setClient] = useState(null);
  const [idClient, setidClient] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [verifi,setVirifi] = useState(false);
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
        setVirifi(true);
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
      {verifi ?(
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
) : (
  <div className='flex flex-col items-center place-content-center text-6xl font-bold text-gray-800 bg-white h-screen w-full'>
    <p>Veuiller vous connecter</p>
    <div className="flex mt-10 space-x-4">
    <button
      className="inline-block rounded border border-neutral-400 bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
      onClick={handleConnexionClick}
    >
      Connecter
    </button>
    <button
      className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
      onClick={handleSignupClick}
    >
      Créer un compte
    </button>
  </div>
  </div>
)}
   <Footer/>
  </div>
);
}
