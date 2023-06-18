import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prixPropose, duree, commentaire, client_id } = req.body;

    try {
      // Find the like entry for the client and the corresponding bien
      const like = await prisma.likes.findFirst({
        where: {
          client_id,
        },
        include: {
          biens: {
            include: {
              Proprietaire: true, // Include the proprietaire information
            },
          },
          Proprietaire: true, // Include the proprietaire information
        },
      });

      if (!like) {
        throw new Error('No matching like found for the client');
      }

      const bien = like.biens;

      if (!bien) {
        throw new Error('No matching bien found for the like');
      }

      const proprietaireId = bien.Proprietaire.id_proprietaire; // Access the id of the proprietaire
      const bienId = bien.id_biens;

      // Create a new negotiation in the database
      const negotiation = await prisma.negotiation.create({
        data: {
          prix_propose: Number(prixPropose),
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
