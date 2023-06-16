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
        proprietaire_id :true,
        Proprietaire: {
          select: {
            nom: true,
          },
        },
      },
    });

    const negotiationsWithBiens = await Promise.all(
      negotiations.map(async (negotiation) => {
        const biens = await prisma.biens.findUnique({
          where: {
            id_biens : negotiation.id_negotiation,
          },
          select: {
            type_bien: true,
          },
        });

        return { ...negotiation, biens };
      })
    );

    res.status(200).json({ negotiations: negotiationsWithBiens });
  } catch (error) {
    console.error('Failed to fetch negotiations:', error);
    res.status(500).json({ error: 'Failed to fetch negotiations' });
  }
}
