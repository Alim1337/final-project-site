// pages/api/login_api.js

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, mdps } = req.body;

    try {
      // Check if the client exists in the database
      const client = await prisma.client.findUnique({
        where: {
          email, // Use the 'email' field as the unique identifier
        },
      });

      if (!client || client.mdps !== mdps) {
        return res.status(401).json({ success: false });
      }

      // Generate a token
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET);

      // Set the token as a cookie in the response
      res.setHeader("Set-Cookie", `token=${token}; Path=/`);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false });
    }
  }

  return res.status(404).end();
}
