import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'DELETE') {
      const { id } = req.query;

      // Check if the demande_client record with the specified ID exists
      const demandeClient = await prisma.demande_client.findUnique({
        where: { id_demande_client: Number(id) },
      });

      if (!demandeClient) {
        return res.status(404).json({ error: 'Demande client not found.' });
      }

      // Delete the demande_client and its associated relations from the database
    const deletedDemande = await prisma.demande_client.delete({
  where: { id_demande_client: demandeClient.id_demande_client },

});


      res.status(200).json({ message: 'Demande client deleted successfully.', deletedDemande });
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete demande client from the database.' });
  }
}
