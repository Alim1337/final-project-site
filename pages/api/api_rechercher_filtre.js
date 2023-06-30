import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { location, address, propertyType, numBedrooms } = req.query;

    const searchOptions = {
      ...(location && { location }),
      ...(address && { adresse }),
      ...(propertyType && { type_bien }),
      ...(numBedrooms && { nbrChambre }),
    };

    const biens = await prisma.biens.findMany({
      where: {
        ...searchOptions,
      },
    });

    const biensWithProprietaire = await Promise.all(
      biens.map(async (bien) => {
        const proprietaire = await prisma.proprietaire.findUnique({
          where: { id_proprietaire: bien.id_proprietaire },
          select: { id_proprietaire: true, nom: true },
        });
        return { ...bien, Proprietaire: proprietaire };
      })
    );

    res.status(200).json(biensWithProprietaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch biens from the database.' });
  }
}
