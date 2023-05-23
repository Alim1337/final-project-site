import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  try {
    const decodedToken = jwt.decode(token);
    const id_client = decodedToken.id;

    console.log('Fetching demande client for id_client:', id_client);
    const demandeClient = await prisma.demande_client.findMany({ // Update the table name to match your schema
      where: {
        id_client: id_client,
      },
    });

    console.log('Demande Client:', demandeClient);
    return res.status(200).json({ demandeClient });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
