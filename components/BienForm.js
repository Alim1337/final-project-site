import React from 'react';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useState } from "react";

export default function BienForm({ onSubmit }) {
  const router = useRouter();

    const [description, setDescription] = useState("");
    const [type_bien, setType_bien] = useState("");
    const [adresse, setAdresse] = useState("");
    const [ville, setVille] = useState("");
    const [code_postal, setCode_postal,] = useState("");
    const [ prix_estime, setPrix_estime] = useState("");
  
    const [etat, setEtat] = useState("");
  
    function handleSubmit(event) {
      event.preventDefault();
      onSubmit( description,
        type_bien,
        adresse,
        ville,
        code_postal,
        prix_estime,
        etat,
       
           );
    };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
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
  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    
    <label htmlFor="description" className="block text-sm 
                      font-medium text-gray-700">
Description
</label>

<div className="mt-1">
<textarea 
                     id="description"
                     name="description"
                     rows="3"
                     className="shadow-sm focus:ring-blue-500 text-black
                      focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"

                     value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
                   ></textarea>
                   
</div>

<div className="mt-2">
<label htmlFor="type" className="block text-sm font-medium text-gray-700">
Type De Bien
</label>
<select
                     id="type"
                     name="type"
                     autoComplete="type"
                     value={type_bien}
                     onChange={(e) => setType_bien(e.target.value)}
                     required
                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block
                     text-black w-full sm:text-sm border-gray-300 rounded-md"
                   >
<option value="">Choose a type</option>
<option value="apartment">Apartment</option>
<option value="house">House</option>
<option value="townhouse">Townhouse</option>
</select>
</div>
<label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <div className="mt-1 border-gray-400 ">
                      <textarea
                        id="adresse"
                        name="adresse"
                        rows="3"
                        className=" border-gray-900  text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mt-2">
<label htmlFor="Ville" className="block text-sm font-medium text-gray-700">
Ville</label>
<select
                     id="Ville"
                     name="Ville"
                     autoComplete="Ville"
                     value={ville}
                     onChange={(e) => setVille(e.target.value)}
                     required
                     className="shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   >
<option value="">Choose </option>
<option value="apartment">Alger</option>

</select>
</div>
<label htmlFor="code postal" className="block text-sm font-medium text-gray-700">
                      Code Postal
                    </label>
                    <div className="mt-1 border-gray-400 ">
                      <textarea
                        id="code postal"
                        name="code postal"
                        rows="3"
                        className=" border-gray-900  text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        value={code_postal}
                        onChange={(e) => setCode_postal(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mt-2">
<label htmlFor="price" className="block text-sm font-medium text-gray-700">
Price
</label>
<div className="mt-1">
<input
                       type="number"
                       name="price"
                       id="price"
                       autoComplete="price"
                       value={prix_estime}
                       onChange={(e) => setPrix_estime(e.target.value)}
                       required
                       className="shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     />
</div>
</div>
<div className="mt-2">
<label htmlFor="type" className="block text-sm font-medium text-gray-700">
Etat</label>
<select
                     id="type"
                     name="type"
                     autoComplete="type"
                     value={etat}
                     onChange={(e) => setEtat(e.target.value)}
                     required
                     className="shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   >
<option value="">Choose</option>
<option value="apartment">so good</option>
<option value="house">just fine</option>
<option value="townhouse">bad</option>
</select>
</div>



<div className="mt-4">
  <button
    type="submit"
    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
  >
    Save
  </button>
</div>

</form>
</div>
</div>

</div>
</div>
</div>
<Footer />
</div>
</div>
);
}

