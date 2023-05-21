import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const searchResults = await prisma.biens.findMany({
      include: {
        Proprietaire: true,
        biens_loue: true,
        biens_vip: true,
      },
    });

    if (searchResults) {
      res.status(200).json(searchResults);
    } else {
      res.status(404).json({ message: 'No search results found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
