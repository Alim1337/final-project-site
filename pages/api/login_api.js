import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, mdps } = req.body;

  try {
    const client = await prisma.client.findFirst({
      where: { email, mdps },
    });

    if (client) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ success: false });
  }
}
