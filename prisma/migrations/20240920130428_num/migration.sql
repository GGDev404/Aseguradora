/*
  Warnings:

  - You are about to drop the column `tipo` on the `Poliza` table. All the data in the column will be lost.
  - Added the required column `tipoPoliza` to the `Poliza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poliza" DROP COLUMN "tipo",
ADD COLUMN     "tipoPoliza" "TipoPoliza" NOT NULL;

-- CreateTable
CREATE TABLE "Asegurado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "polizaId" INTEGER NOT NULL,

    CONSTRAINT "Asegurado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AgenteToPoliza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgenteToPoliza_AB_unique" ON "_AgenteToPoliza"("A", "B");

-- CreateIndex
CREATE INDEX "_AgenteToPoliza_B_index" ON "_AgenteToPoliza"("B");

-- AddForeignKey
ALTER TABLE "Asegurado" ADD CONSTRAINT "Asegurado_polizaId_fkey" FOREIGN KEY ("polizaId") REFERENCES "Poliza"("numeroDePoliza") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgenteToPoliza" ADD CONSTRAINT "_AgenteToPoliza_A_fkey" FOREIGN KEY ("A") REFERENCES "Agente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgenteToPoliza" ADD CONSTRAINT "_AgenteToPoliza_B_fkey" FOREIGN KEY ("B") REFERENCES "Poliza"("numeroDePoliza") ON DELETE CASCADE ON UPDATE CASCADE;
