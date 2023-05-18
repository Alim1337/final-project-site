import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const existingClient = await prisma.client.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingClient) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const storedPassword = existingClient.mdps;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token with all client information as payload
    const token = jwt.sign(
      {
        id: existingClient.id_client,
        nom: existingClient.nom,
        prenom: existingClient.prenom,
        email: existingClient.email,
        telephone: existingClient.telephone,
        date_naissance: existingClient.date_naissance,
        sex: existingClient.sex,
        date_dinscription: existingClient.date_dinscription,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    console.log('Token:', token);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
