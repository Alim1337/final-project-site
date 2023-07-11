import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  const { demandeClient_id , demandeClient} = req.body;

  try {
       if (req.method === 'DELETE') {
      // Handle the delete operation
      console.log('Supprimer clicked for demande ID:', demandeClient_id);
      // Implement your logic to delete the demande with the specified ID
      await prisma.demande_client.delete({
        where: { id_demande_client:demandeClient_id },
      });

      console.log('Demande deleted successfully');
      return res.status(200).json({ message: 'Demande deleted successfully' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
