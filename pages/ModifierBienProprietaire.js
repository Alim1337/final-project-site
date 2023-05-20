import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BgLogin from '@/components/bg_login';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';

export default function ModifierBienProprietaire() {
  const [biens, setBiens] = useState([]);
  const [selectedBien, setSelectedBien] = useState(null);
  const [token, setToken] = useState(null); // Declare the token state variable
  const router = useRouter();

  // Fetch biens data
  useEffect(() => {
    console.log('Token men la page front:', token);

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt.decode(storedToken);
      if (decodedToken && decodedToken.id_proprietaire) {
        const id_proprietaire = decodedToken.id_proprietaire;
        fetchBiens(id_proprietaire);
      }
    }
  }, [token]);

  // Function to fetch biens
  const fetchBiens = async (id_proprietaire) => {
    try {
      console.log('Fetching biens with id_proprietaire:', id_proprietaire);

      const response = await axios.get('/api/api_biens', {
        headers: {
          Authorization: token,
        },
        params: {
          id_proprietaire: id_proprietaire,
        },
      });

      const data = response.data;
      setBiens(data);
      console.log('Biens updated:', data);
    } catch (error) {
      console.log('Error fetching biens:', error);
    }
  };

  // Function to delete a bien
  const handleDeleteBien = async (id) => {
    try {
      await axios.delete(`/api/api_biens?id=${id}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchBiens(selectedBien.id_proprietaire); // Pass the id_proprietaire
    } catch (error) {
      console.log('Error deleting bien:', error);
    }
  };

  // Function to save the edited bien
  const handleSaveBien = async () => {
    try {
      await axios.put(`/api/api_biens?id=${selectedBien.id_biens}`, selectedBien, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      fetchBiens(selectedBien.id_proprietaire); // Pass the id_proprietaire
      setSelectedBien(null); // Clear selected bien

      toast.success('Bien successfully updated');
      console.log('Bien updated:', selectedBien);
    } catch (error) {
      toast.error('Error updating bien');
      console.log('Error updating bien:', error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setSelectedBien({
      ...selectedBien,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BgLogin />
      <ToastContainer />

      <main className="flex-grow py-8 bg-gray-100">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Gestion des biens</h1>
          {biens.length > 0 ? (
            biens.map((bien) => (
              <div
                key={bien.id_biens}
                className="border rounded p-4 mb-4 bg-gray-300 text-black font-mono transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              >
                {selectedBien && selectedBien.id_biens === bien.id_biens ? (
                  <>
                    <p className="mb-2">
                      Description:
                      <input
                        type="text"
                        name="description"
                        value={selectedBien.description}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="mb-2">
                      Type de bien:
                      <input
                        type="text"
                        name="type_bien"
                        value={selectedBien.type_bien}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="mb-2">
                      Adresse:
                      <input
                        type="text"
                        name="adresse"
                        value={selectedBien.adresse}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="mb-2">
                      Ville:
                      <input
                        type="text"
                        name="ville"
                        value={selectedBien.ville}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="mb-2">
                      Code postal:
                      <input
                        type="text"
                        name="code_postal"
                        value={selectedBien.code_postal.join(', ')}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="mb-2">
                      Prix estimé:
                      <input
                        type="text"
                        name="prix_estime"
                        value={selectedBien.prix_estime}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="mb-2">
                      État:
                      <input
                        type="text"
                        name="etat"
                        value={selectedBien.etat}
                        onChange={handleInputChange}
                      />
                    </p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-800 transition duration-300 ease-in-out"
                      onClick={handleSaveBien}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mb-2">Description: {bien.description}</p>
                    <p className="mb-2">Type de bien: {bien.type_bien}</p>
                    <p className="mb-2">Adresse: {bien.adresse}</p>
                    <p className="mb-2">Ville: {bien.ville}</p>
                    <p className="mb-2">Code postal: {bien.code_postal.join(', ')}</p>
                    <p className="mb-2">Prix estimé: {bien.prix_estime}</p>
                    <p className="mb-2">État: {bien.etat}</p>
                    <button
                      className="flex items-center bg-red-400 text-white px-4 py-2 rounded mr-2 hover:bg-red-800 transition duration-300 ease-in-out"
                      onClick={() => handleDeleteBien(bien.id_biens)}
                    >
                      <FiTrash2 className="mr-1" />
                      Supprimer
                    </button>
                    <button
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300 ease-in-out"
                      onClick={() => handleEditBien(bien)}
                    >
                      <FiEdit className="mr-1" />
                      Modifier
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center mt-4">Aucun bien trouvé.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
