import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { type_bien, prix_minimum, prix_maximum, surface_minimum, nbr_chambre_minimum } = req.body;
  const token = req.body; // Using optional chaining operator to safely access nested properties

if (!token) {
  return res.status(401).json({ error: 'Unauthorized' });
}

// Rest of the code assuming the token object is available

  try {
    console.log('Inserting Demande_client for id_client:', token.id);
    const demandeClient = await prisma.demande_client.create({
      data: {
        id_client:token.id,
        type_bien,
        type_de_transaction:"location",
        prix_minimum,
        prix_maximum,
        surface_minimum,
        nbr_chambre_minimum,
        date_debut_rechercher: new Date(),
        statut_demande:"on",
        // You may need to adjust the field names and data types based on your Prisma model
      },
    });

    console.log('Demande_client inserted:', demandeClient);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}