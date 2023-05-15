import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
  const { nom, prenom,email,telephone,mdps,date_naissance,sex } = req.body;

  try {
    const result = await prisma.client.create({
      data: {
        nom ,
        prenom,
        email,
        telephone,
        mdps,
        date_naissance,
        sex,
        date_dinscription: new Date(),
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  } 
}
