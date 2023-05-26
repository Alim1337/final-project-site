import React, { useState } from 'react';

function FormNegotiation({ onSubmit }) {
  const [prixPropose, setPrixPropose] = useState('');
  const [duree, setDuree] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ prixPropose, duree, commentaire });
    setPrixPropose('');
    setDuree('');
    setCommentaire('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 white">
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
      <div className="mb-4">
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit Negotiation
      </button>
    </form>
  );
}

export default FormNegotiation;
