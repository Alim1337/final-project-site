import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.userType !== 'proprietaire') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const properties = await prisma.biens.findMany({
      where: {
        id_proprietaire: decodedToken.id,
      },
    });

    return res.status(200).json({ properties });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
