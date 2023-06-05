import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const NegotiationClient = () => {
  const [negotiations, setNegotiations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt.decode(token);
          const clientID = decodedToken.id;
          console.log("client id ",decodedToken.id);
          const res = await fetch(`/api/api_voir_negotiation_client?client_id=${clientID}`);
          const data = await res.json();
          setNegotiations(data.negotiations);
        } else {
          router.push('/login'); // Redirect to login page if token is not found
        }
      } catch (error) {
        console.error('Failed to fetch negotiations:', error);
      }
    };

    fetchNegotiations();
  }, []);

  return (
    <div>
      <h1>Negotiations for Client</h1>
      {negotiations && negotiations.length > 0 ? (
        negotiations.map((negotiation) => (
          <div key={negotiation.id}>
            {/* Display negotiation details */}
            <p>Negotiation ID: {negotiation.id}</p>
            {/* Display additional negotiation details */}
            <p>Prx Propose: {negotiation.prix_propose}</p>
            <p>Duration: {negotiation.duree}</p>

          </div>
        ))
      ) : (
        <p>No negotiations found for the client.</p>
      )}
    </div>
  );
};

export default NegotiationClient;
