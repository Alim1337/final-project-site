import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    const { description, type_bien,adresse, ville, code_postal, prix_estime, etat} = req.body;

    const client = await prisma.client.findUnique({
      where: { email: session.user.email },
    });

    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }

    let proprietaire = await prisma.proprietaire.findUnique({
      where: { email: session.user.email },
    });

    if (!proprietaire) {
      proprietaire = await prisma.proprietaire.create({
        data: {
          nom: client.nom,
          prenom: client.prenom,
          email: client.email,
          telephone: client.telephone,
          mdps: client.mdps,
          date_naissance: client.date_naissance, // convert to DateTime type
          sex: client.sex,
          date_dinscription: client.date_dinscription,
          clientId: client.id,
        },
      });
    }

    const bien = await prisma.biens.create({
      data: {
        description,
        type_bien,
        adresse,
        ville,
        code_postal,
        prix_estime,
        etat,
        id_proprietaire: proprietaire.id,
      },
    });

    res.json({ message: 'Bien created successfully', bien });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
