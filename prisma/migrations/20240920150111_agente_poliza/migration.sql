/*
  Warnings:

  - You are about to drop the `_AgenteToPoliza` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `agenteId` to the `Poliza` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AgenteToPoliza" DROP CONSTRAINT "_AgenteToPoliza_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgenteToPoliza" DROP CONSTRAINT "_AgenteToPoliza_B_fkey";

-- AlterTable
ALTER TABLE "Poliza" ADD COLUMN     "agenteId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AgenteToPoliza";

-- AddForeignKey
ALTER TABLE "Poliza" ADD CONSTRAINT "Poliza_agenteId_fkey" FOREIGN KEY ("agenteId") REFERENCES "Agente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
