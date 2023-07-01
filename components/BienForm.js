import React, { useState } from 'react';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function BienForm({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [nbrChambre, setNbrChambre] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const adresseOptions = ['Aïn Benian','Aïn Taya','Alger-Centre','Baba Hassen','Bab El Oued','Bab Ezzouar',
  'Bachdjerrah','Baraki','Belouizdad','Ben Aknoun','Beni Messous',
  'Birkhadem','Bir Mourad Raïs','Birtouta','Bologhine',
  'Bordj El Bahri','Bordj El Kiffan','BouroubaBouzareah','Casbah',
  'Chéraga','Dar El Beïda','Dely Ibrahim',
  'Djasr Kasentina','Douera','Draria',
  'El Achour','El Biar','El Hammamet','El Harrach','El Madania',
  'El Marsa','El Mouradia','El Magharia','Hraoua','Hussein-Dey','Hydra',
  'Khraïssia','Kouba','Les Eucalyptus','Mahelma','Mohammadia','Oued Koriche',
  'Oued Smar','Ouled Chebel','Ouled Fayet',
  'Rahmania','Raïs Hamidou','Réghaïa','Rouïba','Saoula',
  
  'Sidi MHamed','Sidi Moussa','Souidania','Staoueli','Tessala El Merdja','Zéralda'];

  const [codePostal, setCodePostal] = useState('');
  const [minPrixEstime, setMinPrixEstime] = useState('');
  const [etat, setEtat] = useState('');
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(
      description,
      typeBien,
      nbrChambre,
      selectedAddress, // Pass the selected address value
      ville,
      codePostal,
      minPrixEstime,
      etat
    );
  }

  
  function handleCancel(event) {
    event.preventDefault();

    if (window.confirm('Are you sure you want to cancel?')) {
      router.push('/panel');
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>

      <div
        className="inline-block align-bottom bg-gray-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Add a new house
              </h3>
              <div className="mt-2">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Titre                     </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        className="border-gray-400 shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="typeBien" className="block text-sm font-medium text-gray-700">
                      Type de bien
                    </label>
                    <div className="mt-1">
                      <select
                        id="typeBien"
                        name="typeBien"
                        required
                        className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        value={typeBien}
                        onChange={(e) => setTypeBien(e.target.value)}
                      >
                        <option value="">Select type de bien</option>
                        <option value="appartement">Appartement</option>
                        <option value="villa">Villa</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className='text-black'>Nombre de Chambres</label>
                    <select
                      id="nbrChambre"
                      name="nbrChambre"
                      className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                      value={nbrChambre}
                      onChange={(e) => setNbrChambre(e.target.value)}
                    >
                      <option value="">Select a number of bedrooms</option>
                      <option value="F3">F3</option>
                      <option value="F4">F4</option>
                      <option value="F5">F5</option>
                      <option value="F6">F6</option>
                      <option value="F7">F7</option>
                      <option value="F8">F8</option>
                      <option value="F9">F9</option>
                      <option value="F10">F10</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <div className="mt-1">
                      <select
                        id="adresse"
                        name="adresse"
                        required
                        className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      >
                        <option value="">Select an address</option>
                        {adresseOptions.map((address) => (
                          <option key={address} value={address}>
                            {address}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <div className="mt-1">
                      <select
                        id="ville"
                        name="ville"
                        required
                        className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        value={ville}
                        onChange={(e) => setVille(address)}
                      >
                        <option value="Alger">Alger</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="prixEstime" className="block text-sm font-medium text-gray-700">
                      Prix Estimé
                    </label>
                    <div className="mt-1 flex">
                      <input
                        type="text"
                        id="minPrixEstime"
                        name="minPrixEstime"
                        required
                        className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md mr-2"
                        placeholder="Min Price"
                        value={minPrixEstime}
                        onChange={(e) => setMinPrixEstime(e.target.value)}
                      />
                      <span className="mr-2">to</span>
                      {/* Add more input fields here */}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="etat" className="block text-sm font-medium text-gray-700">
                      État du bien
                    </label>
                    <div className="mt-1">
                      <select
                        id="etat"
                        name="etat"
                        required
                        className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        value={etat}
                        onChange={(e) => setEtat(e.target.value)}
                      >
                        <option value="">Select a property status</option>
                        <option value="neuf">Neuf (New)</option>
                        <option value="bonne_condition">Bonne condition (Good condition)</option>
                        <option value="rénové">Rénové (Renovated)</option>
                        <option value="à_rénover">À rénover (To renovate)</option>
                        <option value="partiellement_rénové">Partiellement rénové (Partially renovated)</option>
                        <option value="en_construction">En construction (Under construction)</option>
                        {/* Add more options here */}
                      </select>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gray-200 group-hover:bg-gray-300 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-600"
                      >
                        Anuller
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
}
