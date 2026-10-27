-- CreateTable
CREATE TABLE "AtividadeDiaria" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "flashcardsRevisados" INTEGER NOT NULL DEFAULT 0,
    "flashcardsCriados" INTEGER NOT NULL DEFAULT 0,
    "flashcardsCriadosExcluidos" INTEGER NOT NULL DEFAULT 0,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "AtividadeDiaria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AtividadeDiaria_usuarioId_data_key" ON "AtividadeDiaria"("usuarioId", "data");

-- AddForeignKey
ALTER TABLE "AtividadeDiaria" ADD CONSTRAINT "AtividadeDiaria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
