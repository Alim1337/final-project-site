import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ModifierBienProprietaire() {
  const [biens, setBiens] = useState([]);
  const router = useRouter();

  // Fetch biens data
  useEffect(() => {
    const id_proprietaire = 1; // Replace with the actual id_proprietaire
    fetchBiens(id_proprietaire);
  }, []);

  // Function to fetch biens
  const fetchBiens = async (id_proprietaire) => {
    try {
      const response = await fetch(`/api/biens?id_proprietaire=${id_proprietaire}`);
      const data = await response.json();
      setBiens(data);
    } catch (error) {
      console.log('Error fetching biens:', error);
    }
  };

  // Function to delete a bien
  const handleDeleteBien = async (id) => {
    try {
      await fetch(`/api/api_biens?id=${id}`, { method: 'DELETE' });
      fetchBiens(); // Fetch biens again to update the list
    } catch (error) {
      console.log('Error deleting bien:', error);
    }
  };

  // Function to navigate to the edit bien page
  const handleEditBien = (id) => {
    router.push(`/ModifierBienProprietaire/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
  <Header />

  <main className="flex-grow py-8">
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gestion des biens</h1>
      {biens.map((bien) => (
        <div key={bien.id_biens} className="border rounded p-4 mb-4">
          <p className="mb-2">Description: {bien.description}</p>
          <p className="mb-2">Type de bien: {bien.type_bien}</p>
          <p className="mb-2">Adresse: {bien.adresse}</p>
          <p className="mb-2">Ville: {bien.ville}</p>
          <p className="mb-2">Code postal: {bien.code_postal.join(', ')}</p>
          <p className="mb-2">Prix estimé: {bien.prix_estime}</p>
          <p className="mb-2">État: {bien.etat}</p>
          <button
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleDeleteBien(bien.id_biens)}
          >
            <FiTrash2 className="mr-1" />
            Supprimer
          </button>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleEditBien(bien.id_biens)}
          >
            <FiEdit className="mr-1" />
            Modifier
          </button>
        </div>
      ))}
    </div>
  </main>

  <Footer />
</div>

  );
}
