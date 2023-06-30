import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { location, address, propertyType, numBedrooms } = req.query;

    const searchOptions = {
      ...(location && { location }),
      ...(address && { adress }),
      ...(numBedrooms && { nbrChambre }),
    };
console.log(location);
console.log(address);

console.log(numBedrooms);

    let biens;

    if (propertyType) {
      biens = await prisma.biens.findMany({
        where: {
          type_bien: propertyType,
          ...searchOptions,
        },
      });
    } else {
      biens = await prisma.biens.findMany({
        where: { ...searchOptions },
      });
    }

    const biensWithProprietaire = await Promise.all(
      biens.map(async (bien) => {
        const proprietaire = await prisma.proprietaire.findUnique({
          where: { id_proprietaire: bien.id_proprietaire },
          select: { id_proprietaire: true, nom: true },
        });
        return { ...bien, Proprietaire: proprietaire };
      })
    );
    console.log(biensWithProprietaire);
    res.status(200).json(biensWithProprietaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch biens from the database.' });
  }
}
