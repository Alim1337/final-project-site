// Import the PrismaClient
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define the API endpoint handler
export default async function handler(req, res) {
  const { client_id } = req.query;

  try {
    const negotiations = await prisma.negotiation.findMany({
      where: {
        client_id: parseInt(client_id),
      },
      select: {
        id_negotiation: true,
        prix_propose: true,
        duree: true,
        statut: true,
        biens: {
          select: {
            type_bien: true,
          },
        },
        Proprietaire: {
          select: {
            nom: true,
          },
        },
      },
    });

    res.status(200).json({ negotiations });
  } catch (error) {
    console.error('Failed to fetch negotiations:', error);
    res.status(500).json({ error: 'Failed to fetch negotiations' });
  }
}
