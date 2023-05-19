import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id_proprietaire } = req.query;
      const biens = await prisma.biens.findMany({
        where: {
          id_proprietaire: parseInt(id_proprietaire),
        },
      });
      res.status(200).json(biens);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching biens' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.biens.delete({
        where: {
          id_biens: parseInt(id),
        },
      });
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error: `Error deleting bien with ID ${id}` });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
