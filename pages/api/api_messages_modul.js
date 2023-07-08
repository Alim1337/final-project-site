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

      const Pnom = messages[0]?.Proprietaire?.nom || ""; // Access the first message's Proprietaire.nom property

      res.json({ messages, Pnom });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else if (req.method === "POST") {
    // Handle the POST method
    // ...
  } else {
    res.status(404).json({ error: "Invalid method" });
  }
}
