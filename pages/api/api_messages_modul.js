import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
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
    const { content, clientId, proprietaireId, negotiationId } = req.body;
    console.log("content:", content);
    console.log("senderId:", proprietaireId);
    console.log("receiverId:", clientId);
    console.log("negotiationId:", negotiationId);
    try {
      const createdMessage = await prisma.message.create({
        data: {
          content: content,
          negotiation_id: parseInt(negotiationId),
          sender_id: parseInt(clientId),
          receiver_id: parseInt(proprietaireId),
        },
        include: {
          negotiation: true,
          Client: true,
          Proprietaire: true,
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
