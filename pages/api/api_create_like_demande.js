import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {  id_demande_client, decodedTokenId ,demandeClients} = req.body;
      console.log('id_demande_client', id_demande_client);
      console.log('proprietaire id:', decodedTokenId);
      console.log('demande client:', demandeClients);
      console.log('client id:', demandeClients.id_client);

     
        const proprietaire = await prisma.proprietaire.findUnique({
          where: {
            id_proprietaire: decodedTokenId,
          },
        });

            const like = await prisma.likes.create({
              data: {
                client_id: demandeClients.id_client,
                id_bien: b,
                proprietaire_id: p,
              },
            });

            res.status(200).json(like);
          } else {
            res.status(400).json({ error: 'Client not found' });
          }
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
