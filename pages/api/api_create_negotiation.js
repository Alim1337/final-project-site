import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function api_create_negotiation(req, res) {
  const { token, bien_id, prix_propose, duree, statut, commentaire } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  try {
    const decodedToken = jwt.decode(token);
    const client_id = decodedToken.id;

    console.log('Client ID:', client_id);
    console.log('Bien ID:', bien_id);
    console.log('Proposed Price:', prix_propose);
    console.log('Duration:', duree);
    console.log('Status:', statut);
    console.log('Comment:', commentaire);

    // Create a new negotiation
    const negotiation = await prisma.negotiation.create({
      data: {
        client_id,
        proprietaire_id: 1, // Replace with the actual Proprietaire ID
        bien_id,
        prix_propose,
        duree,
        statut,
        commentaire,
      },
    });

    console.log('Negotiation created:', negotiation);
    res.status(200).json({ success: true, negotiation });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
