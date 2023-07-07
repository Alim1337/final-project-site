import BgLogin from "../components/bg_login";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from "next/image";


function CardHouseModifier({ id_biens, description, type_bien, nbrChambre, adresse, ville, code_postal, prix_estime, etat, Proprietaire }) {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [newValues, setNewValues] = useState({
    id_biens: id_biens,
    description: description,
    type_bien: type_bien,
    nbrChambre: nbrChambre,
    adresse: adresse,
    ville: ville,
    code_postal: code_postal,
    prix_estime: prix_estime,
    etat: etat,
    Proprietaire: Proprietaire
  });

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const timestamp = new Date().getTime(); // Get a timestamp
      const imageName = `image_${id_biens}_${timestamp}`; // Create a unique image name with id_biens
      const imageData = e.target.result;
      const imageObject = {
        name: imageName,
        data: imageData
      };

      setImage(imageObject);
      // Save the image in localStorage
      localStorage.setItem(`image_${id_biens}`, JSON.stringify(imageObject));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleModifier = () => {
    setIsModifying(true);
  };

  const handleDone = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/api_modifier_bien_button', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_biens, newValues , Proprietaire}),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle the success response
        console.log('Modifier API response:', data);
        // Add your logic here
      } else {
        // Handle the error response
        console.log('Modifier API error');
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
    setIsModifying(false);
    router.push('/gestionBien_modify');
  };
  const handleSupprimer = async (event) => {
    event.preventDefault();
    console.log(id_biens);
  
    try {
      const response = await fetch(`/api/api_supprimer_bien_button/${id_biens}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_biens }), // Pass id_biens directly
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle the success response
        console.log('Supprimer API response:', data);
        // Add your logic here
      } else {
        // Handle the error response
        console.log('Supprimer API error');
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  

  const getImageSrc = () => {
    if (type_bien === 'villa') {
      return 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg';
    } else {
      return 'https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/petit-appartement-amenage.jpg';
    }
  };

  const getStoredImage = () => {
    const storedImage = localStorage.getItem(`image_${id_biens}`);
    if (storedImage) {
      return JSON.parse(storedImage).data;
    }
    return null;
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-1 md:p-2 
    transition duration-300ease-out transform">
    <div className="relative h-32 w-full mb-4">
        <Image
          src={getStoredImage() || getImageSrc()}
          alt="Property Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {isModifying ? (
        <form onSubmit={handleDone}>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description :</label>
            <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
              type="text"
              id="description"
              name="description"
              value={newValues.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="type_bien">Type :</label>
            <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
              type="text"
              id="type_bien"
              name="type_bien"
              value={newValues.type_bien}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nbrChambre">Nombre de chambres :</label>
            <select
              type="number"
              id="nbrChambre"
              name="nbrChambre"
              className="block border rounded py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline w-full"
              value={newValues.nbrChambre}
              onChange={handleInputChange}
            >
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="adresse">Adresse :</label>
            <select
              type="text"
              id="adresse"
              name="adresse"
              className="block border rounded py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline w-full"
              value={newValues.adresse}
              onChange={handleInputChange}
            >
              <option value="">Select an address</option>
              {adresseOptions.map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ville">Ville :</label>
            <select
              type="text"
              id="ville"
              name="ville"
              className="block border rounded py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline w-full"
              value={newValues.ville}
              onChange={handleInputChange}
            >
              <option value="Alger">Alger</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="prix_estime">Prix estimé :</label>
            <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"
              type="number"
              id="prix_estime"
              name="prix_estime"
              value={newValues.prix_estime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="etat">État :</label>
            <select
              type="text"
              id="etat"
              name="etat"
              className="block border rounded py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline w-full"
              value={newValues.etat}
              onChange={handleInputChange}
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
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Image :</label>
            <div>
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <button type="submit" className="text-red-500  flex-auto bg-white border border-red-100 px-4 py-2
            font-mono shadow-md rounded-full font-medium mt-5 mx-1 hover:shadow-2xl active:scale-90 transition duration-150 w-full">
            Done
          </button>
        </form>
      ) : (
        <div>
          <p className="block text-gray-700 font-bold mb-2">Description :</p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full">{description}</p>
          <p className="block text-gray-700 font-bold mb-2">Type :</p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full">{type_bien}</p>
          <p className="block text-gray-700 font-bold mb-2">Adresse :</p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full">{adresse}</p>
          <p className="block text-gray-700 font-bold mb-2">Ville : </p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full">{ville}</p>
          <p className="block text-gray-700 font-bold mb-2">prix estime :</p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"> {prix_estime} Dzd</p>
          <p className="block text-gray-700 font-bold mb-2">état :</p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"> {etat}</p>
          <p className="block text-gray-700 font-bold mb-2">Nombre de chambres :</p><p className="block border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-full"> {nbrChambre}</p>
          <div className="flex justify-end mt-4">
        
      </div>   
      <div className="flex px-3">
      <button
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
            onClick={handleModifier}
          >
            Modifier
          </button>
          <div className="pr-2"/>
      <button
        className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
        onClick={handleSupprimer}
      >
        Supprimer
      </button>
          </div>
        </div>
        
      )}
     
    </div>
  );
}

export default CardHouseModifier;
