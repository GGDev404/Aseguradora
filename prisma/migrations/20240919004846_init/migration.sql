-- CreateEnum
CREATE TYPE "TipoPoliza" AS ENUM ('GASTOS_MEDICOS', 'AUTO', 'SEGURO_DE_VIDA');

-- CreateEnum
CREATE TYPE "EstadoPoliza" AS ENUM ('VIGENTE', 'VENCIDA');

-- CreateTable
CREATE TABLE "Agente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Agente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "agenteId" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poliza" (
    "numeroDePoliza" SERIAL NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaVigencia" TIMESTAMP(3) NOT NULL,
    "aseguradora" TEXT NOT NULL,
    "tipo" "TipoPoliza" NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "estado" "EstadoPoliza" NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Poliza_pkey" PRIMARY KEY ("numeroDePoliza")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agente_email_key" ON "Agente"("email");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_agenteId_fkey" FOREIGN KEY ("agenteId") REFERENCES "Agente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poliza" ADD CONSTRAINT "Poliza_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
