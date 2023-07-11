import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import jwt from 'jsonwebtoken';
import { HiHeart } from "react-icons/hi2";

function CardHouse({ id_biens, description, type_bien, adresse, ville, code_postal, prix_estime, etat, nbrChambre, Proprietaire, token, onInterestedClick }) {
  const [image, setImage] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (token) {
      setDecodedToken(jwt.decode(token));
    }
  }, [token]);

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

  const handleSubmitIMAGE = (event) => {
    event.preventDefault();
    // Logic for handling 'Modifier' button click
    console.log('Image submitted:', image);
    // Save the image in localStorage
    localStorage.setItem(`image_${id_biens}`, JSON.stringify(image));
  };

  const getStoredImage = () => {
    const storedImage = localStorage.getItem(`image_${id_biens}`);
    if (storedImage) {
      return JSON.parse(storedImage).data;
    }
    return null;
  };

  const handleInterestedClick = async () => {
    try {
      const res = await fetch('/api/api_create_like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decodedToken: token,
          bien_id: id_biens,
          proprietaire_id: Proprietaire.id_proprietaire,
        }),
      });

      if (res.ok) {
        const like = await res.json();
        // Redirect to the negotiation page
        router.push('/negotiation');
      } else {
        console.error('Failed to create like');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getImageSrc = () => {
    if (type_bien === 'villa') {
      return 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg'; // Replace with the URL of the villa image
    } else {
      return 'https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/petit-appartement-amenage.jpg?itok=GapSYMo3'; // Default image URL
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="relative h-32 w-full mb-4">
        <Image
          src={getStoredImage() || getImageSrc()}
          alt="Property Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="text-xl mb-2 ">Proprietaire: {Proprietaire.nom}</p>

      <p className="text-xl mb-2 ">Titre: {description}</p>
      <p className="text-xl mb-2">Type: {type_bien}</p>
      <p className="text-xl mb-2">Adresse: {adresse}</p>
      <p className="text-xl mb-2">Ville: {ville}</p>
      <p className="text-xl mb-2">prix estime: {prix_estime}</p>
      <p className="text-xl mb-2">état: {etat}</p>
      <p className="text-xl mb-2">Nombre de chambres: {nbrChambre}</p>

     
      {decodedToken && decodedToken.id === Proprietaire.id_proprietaire ? (
        <p className="text-red-500 text-xl font-bold mt-4">Votre bien </p>
      ) : (
        token && (
          <button
            className="text-red-500 border-2xl border-red-400 bg-white px-8 py-4 font-mono shadow-md rounded-full font-bold my-3 hover:shadow-2xl active:scale-90 transition duration-150"
            onClick={() => onInterestedClick(id_biens, Proprietaire.id_proprietaire)}
          >
            <div className="flex items-center justify-between"><HiHeart className='mr-2'/><p>Jaime</p></div>
            
          </button>
        )
      )}
    </div>
  );
}

export default CardHouse;
