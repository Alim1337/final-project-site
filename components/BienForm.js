import React, { useState } from 'react';
import Footer from './Footer';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';
export default function BienForm({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [nbrChambre, setNbrChambre] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [image, setImage] = useState(null);

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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const timestamp = new Date().getTime(); // Get a timestamp
      const imageName = `image_${timestamp}`; // Create a unique image name
      const imageData = e.target.result;
      const imageObject = {
        name: imageName,
        data: imageData
      };

      setImage(imageObject);
      // Save the image in localStorage
      localStorage.setItem('selectedImage', JSON.stringify(imageObject));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitIMAGE = (event) => {
    event.preventDefault();
    // Logic for handling 'Modifier' button click
    console.log('Image submitted:', image);
    // Save the image in localStorage
    localStorage.setItem('selectedImage', JSON.stringify(image));
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>

      <div
        className="inline-block items-center pt-20 align-bottomtext-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white bg-opacity-80 px-10 pt-5 pb-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mt-2">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Titre :
                    </label>
                    <div className="mt-1">
                      <input
                        id="description"
                        name="description"
                        rows="3"
                        className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
                        required
                        placeholder='Title'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="typeBien" className="block text-gray-700 font-bold mb-2">
                      Type de bien :
                    </label>
                    <div className="mt-1">
                      <select
                        id="typeBien"
                        name="typeBien"
                        required
                        className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
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
                    <label className='block text-gray-700 font-bold mb-2'>Nombre de Chambres :</label>
                    <select
                      id="nbrChambre"
                      name="nbrChambre"
                      className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                      focus:outline-none focus:shadow-outline w-full"
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
                    <label htmlFor="adresse" className="block text-gray-700 font-bold mb-2">
                      Adresse :
                    </label>
                    <div className="mt-1">
                      <select
                        id="adresse"
                        name="adresse"
                        required
                        className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
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
                    <label htmlFor="ville" className="block text-gray-700 font-bold mb-2">
                      Ville :
                    </label>
                    <div className="mt-1">
                      <select
                        id="ville"
                        name="ville"
                        required
                        className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
                        value={ville}
                        onChange={(e) => setVille(address)}
                      >
                        <option value="Alger">Alger</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="prixEstime" className="block text-gray-700 font-bold mb-2">
                      Prix Estimé :
                    </label>
                    <div className="mt-1 flex">
                      <input
                        type="text"
                        id="minPrixEstime"
                        name="minPrixEstime"
                        required
                        className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
                        placeholder="Min Price"
                        value={minPrixEstime}
                        onChange={(e) => setMinPrixEstime(e.target.value)}
                      />
                     
                      {/* Add more input fields here */}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="etat" className="block text-gray-700 font-bold mb-2 pt-2">
                      État du bien :
                    </label>
                    <div className="mt-1">
                      <select
                        id="etat"
                        name="etat"
                        required
                        className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
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
                        className="text-red-500  flex-auto bg-white border border-red-100 px-4 py-2
                        font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-red-100  flex-auto bg-red-400 border border-red-500 px-4 py-2
                        font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
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
        
      </div>
    </div>
    <Footer />
  </div>
);
}
