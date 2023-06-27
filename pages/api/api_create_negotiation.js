import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prixPropose, duree, commentaire, client_id, idClient, id_likes, bien_id, proprietaire_id } = req.body;

    console.log("prix propose: ", prixPropose);
    console.log("bien_id: ", bien_id);
    console.log("proprietaire_id: ", proprietaire_id);
    console.log("id_likes: ", id_likes);
    console.log("client_id: ", client_id);


    try {
      const negotiation = await prisma.negotiation.create({
        data: {
          prix_propose: Number(prixPropose),
          duree,
          commentaire,
          statut: 'waiting',
          bien_id: parseInt(bien_id),
          client_id,
          id_like: parseInt(id_likes),
          proprietaire_id: parseInt(proprietaire_id),
          bien_id: parseInt(bien_id)// Connect the negotiation to the corresponding bien
        },
      });

      res.status(201).json({ negotiation });
    } catch (error) {
      console.error('Failed to create negotiation:', error);
      res.status(500).json({ error: 'Failed to create negotiation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
