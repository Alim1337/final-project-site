import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const proprietaire = await prisma.Proprietaire.findUnique({
        where: {
          id_proprietaire: 1, // Replace with the actual proprietaire ID
        },
      });

      res.status(200).json(proprietaire);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from the database.' });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'PUT') {
    try {
      const { nom, prenom, email, ville, telephone, date_naissance, sex } = req.body;

      const updatedProprietaire = await prisma.Proprietaire.update({
        where: {
          id_proprietaire: 1, // Replace with the actual proprietaire ID
        },
        data: {
          nom,
          prenom,
          email,
          ville,
          telephone,
          date_naissance,
          sex,
        },
      });

      res.status(200).json(updatedProprietaire);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the data in the database.' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
