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
      console.log('decoded UserType:', decodedTokenVrai.userType);
      console.log('decoded client:', decodedTokenVrai.id);
      console.log('decoded usertype:', decodedTokenVrai.userType);
      const u = decodedTokenVrai.userType;

      let i, b, p;
      if (decodedToken.userType === 'proprietaire') {
        i = decodedTokenVrai.id;
        b = bien_id;
        p = proprietaire_id;
      } else {
        i = decodedTokenVrai.id;
        b = bien_id;
        p = proprietaire_id;
      }

      console.log('client_id', i);
      console.log('id_bien', b);
      console.log('proprietaire_id p', p);

      // Check the userType
      if (decodedTokenVrai.userType === 'client') {
        // Create the like for a client
        const like = await prisma.likes.create({
          data: {
            client_id: i,
            id_bien: b,
            proprietaire_id: p,
          },
        });

        res.status(200).json(like);
      } else if (decodedTokenVrai.userType === 'proprietaire') {
        const proprietaire = await prisma.Proprietaire.findUnique({
          where: {
            id_proprietaire:i,
          },
        });

        if (proprietaire) {
          // Create the like for a proprietaire
          // Use the id_client from the proprietaire record
          const like = await prisma.likes.create({
            data: {
              client_id: proprietaire.id_client,
              id_bien: b, // Switched value
              proprietaire_id:p, // Switched value
            },
          });

          res.status(200).json(like);
        } else {
          res.status(400).json({ error: 'Proprietaire not found' });
        }
      } else {
        res.status(400).json({ error: 'Invalid userType' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create like' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
