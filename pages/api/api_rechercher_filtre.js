import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { location, address, propertyType, numBedrooms } = req.body;
    console.log(propertyType);
    console.log(address);

    let biens; // Declare the biens variable here

    if (propertyType) {
      biens = await prisma.biens.findMany({
        where: { type_bien: propertyType }
      });
    }
    
    console.log("biens",biens);
    res.status(200).json(biens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch biens from the database.' });
  }
}
