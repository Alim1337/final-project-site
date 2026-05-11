import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { location, address, propertyType } = req.body;
    console.log({propertyType});
    console.log({address});
    console.log({location});
    if(!propertyType || !address || !location){
      return  res.status(400).json({});

    }
    const searchResults = await prisma.biens.findMany({
      where: {
        adresse: {
          contains: address,
        },
        ville: {
          contains: location,
        },
        type_bien: {
          contains: propertyType,
        },
      },
    });
console.log({searchResults});

    const biensWithProprietaire = await Promise.all(
      searchResults.map(async (bien) => {
        const proprietaire = await prisma.proprietaire.findUnique({
          where: { id_proprietaire: bien.id_proprietaire },
          select: {
            id_proprietaire: true,
            nom: true,
          },
        });
        return { ...bien, Proprietaire: proprietaire };
      })
    );
    console.log({biensWithProprietaire});

    res.status(200).json({ searchResults: biensWithProprietaire });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch search results from the database.' });
  }
}
