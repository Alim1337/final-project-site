/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "mdps" TEXT NOT NULL,
    "date_de_naissance" TIMESTAMP(3),
    "sex" TEXT,
    "date_d_inscription" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientVip" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "mdps" TEXT NOT NULL,
    "dateDeNaissance" TIMESTAMP(3),
    "sex" TEXT,
    "dateDInscription" TIMESTAMP(3),
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "ClientVip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientVip_clientId_key" ON "ClientVip"("clientId");

-- AddForeignKey
ALTER TABLE "ClientVip" ADD CONSTRAINT "ClientVip_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
