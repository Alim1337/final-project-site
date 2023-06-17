import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id_proprietaire = req.query.id_proprietaire;

  if (!id_proprietaire) {
    return res.status(400).json({ error: 'Missing id_proprietaire' });
  }

  try {
    console.log('Fetching biens for client:', id_proprietaire);
    const biens = await prisma.biens.findMany({
      where: {
        id_proprietaire: parseInt(id_proprietaire),
      },
    });

    console.log('Biens:', biens);

    return res.status(200).json({ biens });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
