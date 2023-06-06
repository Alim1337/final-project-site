import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NegotiationProprietaire = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [proprietaireName, setProprietaireName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchNegotiations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt.decode(token);
          const proprietaireID = decodedToken.id;
          const proprietaireName = decodedToken.nom;
          const proprietaireEmail = decodedToken.email;
          console.log('Proprietaire id ', proprietaireID);
          console.log('Proprietaire name ', proprietaireName);
          console.log('Proprietaire email ', proprietaireEmail);
          setProprietaireName(proprietaireName);
          const res = await fetch(`/api/api_voir_negotiation_proprietaire?proprietaire_email=${proprietaireEmail}`);
          const data = await res.json();
          setNegotiations(data.negotiations);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch negotiations:', error);
      }
    };

    fetchNegotiations();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Negotiations pour le Proprietaire: {proprietaireName}</h1>
        {negotiations && negotiations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {negotiations.map((negotiation) => (
              <div
                key={negotiation.id_negotiation}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-350 transition-shadow duration-500"
              >
                <p className="font-bold">Negotiation ID: {negotiation.id_negotiation}</p>
                <p>Prix Propose: {negotiation.prix_propose}</p>
                <p>Duration: {negotiation.duree}</p>
                <p>Status: {negotiation.statut}</p>

                {negotiation.Proprietaire && (
                  <p>
                    Proprietaire Nom: {negotiation.Proprietaire.nom} ({negotiation.Proprietaire.email})
                  </p>
                )}

                {negotiation.biens && <p>Bien Type: {negotiation.biens.type_bien}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No negotiations found for the Proprietaire.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NegotiationProprietaire;
