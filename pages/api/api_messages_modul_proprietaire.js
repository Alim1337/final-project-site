import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get all messages for a specific negotiation
    const negotiation_id = req.query.negotiation_id;

    try {
      const messages = await prisma.message.findMany({
        where: {
          negotiation_id: parseInt(negotiation_id),
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
    const content = req.query.content;
    const clientId = req.query.receiver_id;
    const proprietaireId = req.query.sender_id;
    const negotiation_id = req.query.negotiation_id;
    console.log("content:", content);

    console.log("clientID:", clientId);
    console.log("ProprietaireID:", proprietaireId);

    try {
      const createdMessage = await prisma.message.create({
        data: {
          content : content,
          negotiation_id: parseInt(negotiation_id),
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
      console.log(createdMessage);
    } catch (error) {

      res.status(500).json({ error: "Failed to create message" });
    }
  } else {
    res.status(404).json({ error: "Invalid method" });
  }
}
