/*
  Warnings:

  - You are about to drop the column `created_at` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Demande client" DROP CONSTRAINT "fk_demande_client";

-- DropForeignKey
ALTER TABLE "Demande client valide" DROP CONSTRAINT "fk_demande_client_valid";

-- DropForeignKey
ALTER TABLE "Demande client valide" DROP CONSTRAINT "fk_demande_client_valid_client";

-- DropForeignKey
ALTER TABLE "Demande client vip " DROP CONSTRAINT "fk_demande_client_vip";

-- DropForeignKey
ALTER TABLE "Demande client vip " DROP CONSTRAINT "fk_demande_client_vip_client";

-- DropForeignKey
ALTER TABLE "interesse" DROP CONSTRAINT "fk_dc";

-- DropForeignKey
ALTER TABLE "interesse" DROP CONSTRAINT "fk_pp";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "fk_bien_like";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_negotiation_id_fkey";

-- DropForeignKey
ALTER TABLE "negotiation" DROP CONSTRAINT "negotiation_bien_id_fkey";

-- DropIndex
DROP INDEX "u_admin_email";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "created_at",
DROP COLUMN "email",
DROP COLUMN "updated_at";

-- AddForeignKey
ALTER TABLE "Demande client" ADD CONSTRAINT "fk_demande_client" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demande client valide" ADD CONSTRAINT "fk_demande_client_valid_client" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demande client vip " ADD CONSTRAINT "fk_demande_client_vip_client" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "fk_bien_like" FOREIGN KEY ("id_bien") REFERENCES "biens"("id_biens") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_negotiaiton_id_fkey" FOREIGN KEY ("negotiation_id") REFERENCES "negotiation"("id_negotiation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "negotiation" ADD CONSTRAINT "negotiation_bien_id_fkey" FOREIGN KEY ("bien_id") REFERENCES "biens"("id_biens") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interesse" ADD CONSTRAINT "fk_dc" FOREIGN KEY ("iid_demande_client") REFERENCES "Demande client"("id_demande_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interesse" ADD CONSTRAINT "fk_pp" FOREIGN KEY ("id_proprietaire") REFERENCES "Proprietaire"("id_proprietaire") ON DELETE CASCADE ON UPDATE CASCADE;
