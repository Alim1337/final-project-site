import React, { useState } from 'react';
import Footer from './Footer';

export default function BienForm({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [minPrixEstime, setMinPrixEstime] = useState('');
  const [etat, setEtat] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(
      description,
      typeBien,
      adresse,
      ville,
      codePostal,
      minPrixEstime,
      etat
    );
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
                        Title
                      </label>
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
                        Type of Property
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
                          <option value="">Select a property type</option>
                          <option value="appartement">Appartement</option>
                          <option value="villa">Villa</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="adresse"
                          name="adresse"
                          rows="3"
                          className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                          required
                          value={adresse}
                          onChange={(e) => setAdresse(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <div className="mt-1">
                        <select
                          id="ville"
                          name="ville"
                          required
                          className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                          value={ville}
                          onChange={(e) => setVille(e.target.value)}
                        >
                          <option value="Alger">Alger</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="codePostal"
                          name="codePostal"
                          autoComplete="codePostal"
                          required
                          className="border-gray-400 text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                          value={codePostal}
                          onChange={(e) => setCodePostal(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="prixEstime" className="block text-sm font-medium text-gray-700">
                        Estimated Price
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
                 
                        <span className="ml-2">DA</span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="etat" className="block text-sm font-medium text-gray-700">
                        Property Status
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
                          <option value="new">New</option>
                          <option value="used">Used</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
