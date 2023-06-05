import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { decodedToken, bien_id, proprietaire_id } = req.body;
      console.log('token', decodedToken);
      console.log('bien id:', bien_id);
      console.log('proprietaire id:', proprietaire_id);

      const decodedTokenVrai = jwt.verify(decodedToken, process.env.JWT_SECRET);
      console.log('decoded token:', decodedTokenVrai);
      console.log('decoded client:', decodedTokenVrai.id);

      // Extract the id_client from the decoded token
      const { id_client } = decodedTokenVrai.id;

      // Get the bien instance by bien_id
      const bien = await prisma.biens.findUnique({
        where: {
          id_biens: bien_id,
        },
      });

      console.log('bien clicked id', bien.id_biens);
      console.log('id proptietaire de bien ', bien.id_proprietaire);

      if (!bien) {
        return res.status(404).json({ error: 'Bien not found' });
      }

      const i = id_client;
      const b = bien_id;
      const p = bien.id_proprietaire;
      console.log('client_id ', i);
      console.log('id_bien ', b);

      console.log('proprietaire_id', p);

      // Create the like
      const like = await prisma.likes.create({
        data: {
          client_id:  decodedTokenVrai.id,
          id_bien: b,
          proprietaire_id: p,
        },
      });

      res.status(200).json(like);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create like' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
