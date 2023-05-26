import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prixPropose, duree, commentaire, bienId, clientId ,token} = req.body;

    try {
      // Create a new negotiation in the database
      const negotiation = await prisma.negotiation.create({
        data: {
          prix_propose: prixPropose,
          duree: duree,
          commentaire: commentaire,
          statut: 'waiting',
          bien_id: bienId,
          client_id: clientId,
        },
      });

      // Retrieve information from the likes model
      const likes = await prisma.likes.findMany();

      res.status(201).json({ negotiation, likes });
    } catch (error) {
      console.error('Failed to create negotiation:', error);
      res.status(500).json({ error: 'Failed to create negotiation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
