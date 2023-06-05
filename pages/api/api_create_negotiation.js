import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prixPropose, duree, commentaire, token, client_id } = req.body; // Update variable name to prixPropose

    try {
      // Find the bien ID using the like model where the client_id matches the client ID from the token
      const like = await prisma.likes.findFirst({
        where: {
          client_id,
        },
      });

      if (!like) {
        throw new Error('No matching like found for the client');
      }

      const bienId = like.id_bien;

      // Get the proprietaire ID from the bien with the specified bienId
      const bien = await prisma.biens.findUnique({
        where: {
          id_biens: bienId,
        },
      });
      const proprietaireId = bien.id_proprietaire;

      // Create a new negotiation in the database
      const negotiation = await prisma.negotiation.create({
        data: {
          prix_propose: Number(prixPropose), // Convert prixPropose to a number
          duree,
          commentaire,
          statut: 'waiting',
          bien_id: bienId,
          client_id,
          proprietaire_id: proprietaireId,
        },
      });

      res.status(201).json({ negotiation });
    } catch (error) {
      console.error('Failed to create negotiation:', error);
      res.status(500).json({ error: 'Failed to create negotiation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
