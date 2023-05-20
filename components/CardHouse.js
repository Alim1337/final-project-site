import React from 'react';
import Image from 'next/image';

function CardHouse({ description, type_bien, adresse, ville, prix_estime, etat }) {
  return (
    <div className="relative cursor-pointer rounded-xl bg-gray-300 hover:bg-slate-600 transform transition duration-300 ease-out group">
      <div className="group h-80 w-80">
      
      </div>
      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 text-2xl mt-3 transform transition duration-300 ease-out">
    {description}
      </h3>
      <div className="border rounded p-4 absolute bottom-4 left-4 bg-white">
        <h3 className="text-xl mb-2">{type_bien}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <h4 className="text-xl font-semibold mb-2">{ville}</h4>
        <p className="text-gray-500">{adresse}</p>
        <p className="text-gray-500">{etat}</p>
        <h4 className="text-xl font-semibold mb-2">${prix_estime}</h4>
      </div>
    </div>
  );
}

export default CardHouse;
