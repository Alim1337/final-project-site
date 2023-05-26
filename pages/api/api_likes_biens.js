import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { token, propertyId } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  try {
    const decodedToken = jwt.decode(token);
    const clientId = decodedToken.id;

    console.log('Client ID:', clientId);
    console.log('Property ID:', propertyId);

    // Check if the client has already liked the property
    const existingLike = await prisma.likes.findFirst({
      where: {
        client_id: clientId,
        proprietaire_id: propertyId,
      },
    });

    if (existingLike) {
      return res.status(400).json({ error: 'Property already liked' });
    }

    // Create a new entry in the Likes table
    const newLike = await prisma.likes.create({
      data: {
        client_id: clientId,
        proprietaire_id: propertyId,
      },
    });

    console.log('New Like:', newLike);

    return res.status(200).json({ message: 'Property liked successfully' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
