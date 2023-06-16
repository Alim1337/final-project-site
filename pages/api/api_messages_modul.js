import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get all messages for a specific negotiation
    const { negotiationId } = req.query;

    try {
      const messages = await prisma.message.findMany({
        where: {
          negotiation_id: parseInt(negotiationId),
        },
        orderBy: {
          timestamp: "asc",
        },
        include: {
          negotiation: true,
          Client: true,
          Proprietaire: true,
        },
      });

      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else if (req.method === "POST") {
    // Create a new message
    const { negotiationId, content } = req.body;
    const { clientId, proprietaireId } = req.query;

    try {
      const negotiation = await prisma.negotiation.findUnique({
        where: { id_negotiation: parseInt(negotiationId) },
        include: {
          Client: true,
          Proprietaire: true,
        },
      });

      const createdMessage = await prisma.message.create({
        data: {
          content,
          negotiation_id: parseInt(negotiationId),
          sender_id: clientId,
          receiver_id: proprietaireId,
        },
      });

      res.json(createdMessage);
    } catch (error) {
      res.status(500).json({ error: "Failed to create message" });
    }
  } else {
    res.status(404).json({ error: "Invalid method" });
  }
}
