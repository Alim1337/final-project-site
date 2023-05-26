import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

function FormNegotiation({ onSubmit }) {
  const [prixPropose, setPrixPropose] = useState('');
  const [duree, setDuree] = useState('');
  const [commentaire, setCommentaire] = useState('');

  // Retrieve the token from local storage if running in the browser
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  console.log('Token:', token);


  if (token) {
    try {
    const  decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken);
      console.log("Decoded client:", decodedToken.id);
    } catch (error) {
      console.error('Failed to verify JWT token:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verify the token and retrieve the client ID
      // ...

      // Prepare the form data
      const formData = {
        prixPropose,
        duree,
        commentaire,
        clientId,
        token, 
        bien_id: bienId,
        client_id: clientId, // Pass the client ID obtained from the token
      };

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
      <div className="mb-4">
        <label htmlFor="prixPropose" className="block text-gray-700">
          Prix Proposé:
        </label>
        <input
          type="text"
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
