import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const proprietaireID = req.query.proprietaireID; // Accessing the proprietaireID from req.query
    console.log(proprietaireID);

    try {
      const negotiations = await prisma.negotiation.findMany({
        where: {
          proprietaire_id: parseInt(proprietaireID),
        },
        include: {
          Proprietaire: {
            select: {
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
