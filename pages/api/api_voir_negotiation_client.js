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
              nom: true,
              id_proprietaire : true,
            },
          },
          biens: {
            select: {
              id_biens : true,
              type_bien: true,
            },
          },
        },
      });

      const formattedNegotiations = negotiations.map(async (negotiation) => {
        const rdv = await prisma.rdv.findFirst({
          where: {
            id_negotiation: negotiation.id_negotiation,
          },
        });

        return {
          id_negotiation: negotiation.id_negotiation,
          client_id: negotiation.client_id,
          prix_propose: negotiation.prix_propose,
          duree: negotiation.duree,
          statut: negotiation.statut,
          commentaire: negotiation.commentaire,
          Proprietaire: { id_proprietaire: negotiation.proprietaire_id, nom: null },
          biens: { type_bien: null },
          rdv,
          Proprietaire: {
            nom: negotiation.Proprietaire?.nom,
            id_proprietaire : negotiation.Proprietaire?.id_proprietaire
          },
          biens: {
            type_bien: negotiation.biens?.type_bien,
            id_biens : negotiation.biens?.id_biens,
          },
        };
        ;
      });

      const formattedNegotiationsWithRdv = await Promise.all(formattedNegotiations);

      console.log(formattedNegotiationsWithRdv);

      res.status(200).json({ negotiations: formattedNegotiationsWithRdv });
    } catch (error) {
      console.error('Failed to fetch negotiations:', error);
      res.status(500).json({ error: 'Failed to fetch negotiations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
