import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { content, receiverId, senderId, negotiationId } = req.query;
  console.log("content:", content);
  console.log("senderId:", senderId);
  console.log("receiverId:", receiverId);
  console.log("negotiationId:", negotiationId);

  if (req.method === "GET") {
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
    try {
      const createdMessage = await prisma.message.create({
        data: {
          content: content,
          negotiation_id: parseInt(negotiationId),
          sender_id: parseInt(senderId),
          receiver_id: parseInt(receiverId),
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
