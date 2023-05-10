import { sql } from "@vercel/postgres";
import { PrismaClient } from '@prisma/client';



//const prisma = new PrismaClient();


    // Insert new record using Prisma
   /* const newProprietaire = await prisma.proprietaire.create({
      data: {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        ville: formData.ville,
        telephone: formData.telephone,
        mdps: formData.mdps,
        date_naissance: formData.date_naissance,
        sex: formData.sex,
        date_dinscription: formData.date_dinscription
      }
    });
    // pages/api/prisma.js*/


// Instantiate a new Prisma client
const prisma = new PrismaClient();

export default prisma;
