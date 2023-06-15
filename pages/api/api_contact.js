import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id_negotiation, senderId, receiverId, content } = req.body;

    try {
      // Create a new message in the database
      const message = await prisma.message.create({
        data: {
          content,
          negotiation: {
            connect: { id_negotiation }, // Connect the message to the negotiation using the negotiation ID
          },
          Proprietaire: {
            connect: { id_proprietaire: senderId }, // Connect the message to the Proprietaire using the sender's ID
          },
          Client: {
            connect: { id_client: receiverId }, // Connect the message to the Client using the receiver's ID
          },
        },
      });

      res.status(201).json({ message });
    } catch (error) {
      console.error('Failed to create message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
