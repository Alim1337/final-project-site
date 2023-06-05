import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

function FormNegotiation({ onSubmit }) {
  const [prixPropose, setPrixPropose] = useState('');
  const [duree, setDuree] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let decodedToken = null; // Declare decodedToken variable with default value

  if (token) {
    decodedToken = jwt.decode(token);
    try {
      console.log("Decoded token:", decodedToken);
      console.log("Decoded client:", decodedToken.id);
    } catch (error) {
      console.error('Failed to verify JWT token:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let clientId = decodedToken.id;
  
      // Prepare the form data
      const formData = {
        prixPropose,
        duree,
        commentaire,
        token,
        client_id: clientId,
      };
  
      console.log(formData); // Review the formData in the console
  
      // Call the onSubmit function provided by the parent component
      onSubmit(formData);
  
      // Reset the form fields
      setPrixPropose('');
      setDuree('');
      setCommentaire('');
    } catch (error) {
      console.error('Failed to verify JWT token:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 text-black">
        <label htmlFor="prixPropose" className="block text-gray-700">
          Prix Proposé:
        </label>
        <input
          type="number"
          id="prixPropose"
          value={prixPropose}
          onChange={(e) => setPrixPropose(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="duree" className="block text-gray-700">
          Durée:
        </label>
        <input
          type="text"
          id="duree"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
      </div>
      <div className="mb-4 text-black">
        <label htmlFor="commentaire" className="block text-gray-700">
          Commentaire:
        </label>
        <textarea
          id="commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}

export default FormNegotiation;
