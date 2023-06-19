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
        include: {
          Proprietaire: {
            select: {
              id_proprietaire: true, // Include the id_proprietaire field
              nom: true,
            },
          },
          biens: {
            select: {
              type_bien: true,
            },
          },
        },
      });

      const formattedNegotiations = negotiations.map((negotiation) => ({
        id_negotiation: negotiation.id_negotiation,
        client_id: negotiation.client_id,
        prix_propose: negotiation.prix_propose,
        duree: negotiation.duree,
        statut: negotiation.statut,
        commentaire: negotiation.commentaire,
        Proprietaire: {
          id_proprietaire: negotiation.Proprietaire?.id_proprietaire,
          nom: negotiation.Proprietaire?.nom,
        },
        biens: {
          type_bien: negotiation.biens?.type_bien,
        },
      }));

      console.log(formattedNegotiations.map((negotiation) => negotiation.Proprietaire?.nom));

      res.status(200).json({ negotiations: formattedNegotiations });
    } catch (error) {
      console.error('Failed to fetch negotiations:', error);
      res.status(500).json({ error: 'Failed to fetch negotiations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
