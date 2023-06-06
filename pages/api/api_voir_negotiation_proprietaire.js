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

      res.status(200).json({ negotiations });
    } catch (error) {
      console.error('Failed to fetch negotiations:', error);
      res.status(500).json({ error: 'Failed to fetch negotiations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
