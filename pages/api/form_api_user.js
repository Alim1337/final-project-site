import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { name, email } = req.body

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    res.status(200).json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error creating user' })
  }
}