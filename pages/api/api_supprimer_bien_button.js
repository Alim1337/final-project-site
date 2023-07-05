import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'DELETE') {
      const { id_biens } = req.body;

      // Delete the bien from the database
      const deletedBien = await prisma.biens.delete({
        where: { id_biens: parseInt(id_biens) }, // Convert id_biens to an integer using parseInt
      });

      res.status(200).json({ message: 'Bien deleted successfully.' });
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete bien from the database.' });
  }
}
