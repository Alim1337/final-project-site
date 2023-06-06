import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { proprietaire_email } = req.query;

    try {
      const negotiations = await prisma.negotiation.findMany({
        where: {
          Proprietaire: {
            email: proprietaire_email,
          },
        },
        include: {
          Proprietaire: true,
          biens: true,
        },
      });

      const formattedNegotiations = negotiations.map((negotiation) => ({
        id_negotiation: negotiation.id_negotiation,
        prix_propose: negotiation.prix_propose,
        duree: negotiation.duree,
        statut: negotiation.statut,
        Proprietaire: {
          nom: negotiation.Proprietaire?.nom,
          email: negotiation.Proprietaire?.email,
        },
        biens: {
          type_bien: negotiation.biens?.type_bien,
        },
      }));

      res.status(200).json({ negotiations: formattedNegotiations });
    } catch (error) {
      console.error('Failed to fetch negotiations:', error);
      res.status(500).json({ error: 'Failed to fetch negotiations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
