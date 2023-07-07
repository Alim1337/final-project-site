import BgLogin from "../components/bg_login";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from "next/image";
import { MdOutlineWorkspacePremium } from "react-icons/md";
function CardHouseModifiervip({ id_biens, description, type_bien,      type_location_vip,
    nbrChambre, adresse, ville, code_postal, prix_estime, etat, Proprietaire }) {
  const [image, setImage] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [newValues, setNewValues] = useState({


    id_biens: id_biens,
    description: description,
    type_bien: type_bien,
    type_location_vip :  type_location_vip    ,

    nbrChambre: nbrChambre,
    adresse: adresse,
    ville: ville,
    code_postal: code_postal,
    prix_estime: prix_estime,
    etat: etat,
    Proprietaire: Proprietaire
  });

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
      const response = await fetch('/api/api_modifier_bien_button_vip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_biens, newValues }),
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
    <div className="bbg-white rounded-lg shadow-md p-6 transition duration-300 ease-out transform hover:scale-105 hover:shadow-lg">
      <div className="relative h-40 md:h-32 w-full mb-4">
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
            <label className="text-base md:text-xl text-black" htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newValues.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="type_bien">Type:</label>
            <input
              type="text"
              id="type_bien"
              name="type_bien"
              value={newValues.type_bien}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="nbrChambre">Nombre de chambres:</label>
            <input
              type="number"
              id="nbrChambre"
              name="nbrChambre"
              value={newValues.nbrChambre}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="nbrChambre">type_location_vip:</label>
            <input
              type="number"
              id="nbrChambre"
              name="nbrChambre"
              value={newValues.type_location_vip}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="adresse">Adresse:</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={newValues.adresse}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="ville">Ville:</label>
            <input
              type="text"
              id="ville"
              name="ville"
              value={newValues.ville}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="prix_estime">Prix estimé:</label>
            <input
              type="number"
              id="prix_estime"
              name="prix_estime"
              value={newValues.prix_estime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="etat">État:</label>
            <input
              type="text"
              id="etat"
              name="etat"
              value={newValues.etat}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="Proprietaire">Propriétaire:</label>
            <input
              type="text"
              id="Proprietaire"
              name="Proprietaire"
              value={newValues.Proprietaire}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base md:text-xl text-black" htmlFor="image">Image:</label>
            <div>
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <button type="submit" className="text-base md:text-xl bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4">
            Done
          </button>
        </form>
      ) : (
        <div>
            <MdOutlineWorkspacePremium/>
          <p className="text-xl mb-2 ">Description: {description}</p>
          <p className="text-xl mb-2">Type de bien: {type_bien}</p>
          <p className="text-xl mb-2">Type de location: {type_location_vip}</p>

          <p className="text-xl mb-2">Adresse: {adresse}</p>
          <p className="text-xl mb-2">Ville: {ville}</p>
          <p className="text-xl mb-2">prix estime: {prix_estime}</p>
          <p className="text-xl mb-2">état: {etat}</p>
          <p className="text-xl mb-2">Nombre de chambres: {nbrChambre}</p>
          <div className="flex justify-end mt-4">
        
      </div>   <button
  className="text-red-500 bg-white px-6 py-3 font-mono shadow-md rounded-full font-bold my-3 hover:shadow-2xl active:scale-90 transition duration-150"
  onClick={handleSupprimer}
>
  Supprimer
</button>

          <button
            className="text-red-500 bg-white px-6 py-3 font-mono shadow-md rounded-full font-bold my-3 hover:shadow-2xl active:scale-90 transition duration-150"
            onClick={handleModifier}
          >
            Modifier
          </button>
        </div>
        
      )}
     
    </div>
  );
}

export default CardHouseModifiervip;
