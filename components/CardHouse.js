import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function CardHouse({ id_biens, description, type_bien, adresse, ville, code_postal, prix_estime, etat, Proprietaire, token, onInterestedClick }) {
  const router = useRouter();

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
    <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-out transform hover:scale-105 hover:shadow-lg">
      <div className="relative h-32 w-full mb-4">
        <Image
          src={getImageSrc()}
          alt="Property Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-lg font-bold mb-2">ID: {id_biens}</h3>
      <p className="text-sm mb-2">Description: {description}</p>
      <p className="text-sm mb-2">Type: {type_bien}</p>
      <p className="text-sm mb-2">Address: {adresse}</p>
      <p className="text-sm mb-2">City: {ville}</p>
      <p className="text-sm mb-2">Estimated Price: {prix_estime} DA</p>
      <p className="text-sm mb-2">State: {etat}</p>
      <p className="text-sm mb-2">Owner: {Proprietaire && Proprietaire.nom}</p>
      {token && (
        <button
          className="text-green-600 bg-white px-8 py-4 font-mono shadow-md rounded-full font-bold my-3 hover:shadow-2xl active:scale-90 transition duration-150"
          onClick={() => onInterestedClick(id_biens, Proprietaire.id_proprietaire)}
        >
          I like this
        </button>
      )}
    </div>
  );
}

export default CardHouse;
