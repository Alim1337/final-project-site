import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const clientID = req.query.client_id; // Accessing the client_id from req.query
    console.log(clientID);

    try {
      const negotiations = await prisma.negotiation.findMany({
        where: {
          client_id: parseInt(clientID),
        },
      });

      const formattedNegotiations = negotiations.map((negotiation) => ({
        id_negotiation: negotiation.id_negotiation,
        client_id: negotiation.client_id,
        prix_propose: negotiation.prix_propose,
        duree: negotiation.duree,
        statut: negotiation.statut,
        commentaire: negotiation.commentaire,
        Proprietaire: { id_proprietaire: negotiation.proprietaire_id, nom: null },
        biens: { type_bien: null },
      }));

      console.log(formattedNegotiations);

      res.status(200).json({ negotiations: formattedNegotiations });
    } catch (error) {
      console.error('Failed to fetch negotiations:', error);
      res.status(500).json({ error: 'Failed to fetch negotiations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
