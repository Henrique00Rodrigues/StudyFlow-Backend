import { prisma } from "../database/index.js";
import { HttpError } from "../errors/HttpError.js";

type CriarFlashcard = {
  frente: string;
  verso: string;
  materiaId: number;
};

type AtualizarFlashcardData = {
  frente: string;
  verso: string;
};

export default {
  listarFlashcardsMateria: async (usuarioId: number, materiaId: number) => {
    const materia = await prisma.materia.findFirst({
      where: {
        id: materiaId,
        usuarioId,
      },
    });

    if (!materia) {
      throw new HttpError(404, "Matéria não encontrada.");
    }

    const flashcards = await prisma.flashcard.findMany({
      where: {
        materiaId,
      },

      orderBy: {
        dataCriacao: "asc",
      },
    });

    return {
      materia,
      flashcards,
    };
  },

  criar: async (
    usuarioId: number,
    { frente, verso, materiaId }: CriarFlashcard,
  ) => {
    const materia = await prisma.materia.findFirst({
      where: {
        id: materiaId,
        usuarioId,
      },
    });

    if (!materia) {
      throw new HttpError(404, "Matéria não encontrada.");
    }

    const flashcard = await prisma.flashcard.create({
      data: {
        frente,
        verso,
        materiaId,
      },
    });

    return flashcard;
  },

  atualizar: async (
    usuarioId: number,
    flashcardId: number,
    { frente, verso }: AtualizarFlashcardData,
  ) => {
    const flashcard = await prisma.flashcard.findFirst({
      where: {
        id: flashcardId,

        materia: {
          is: {
            usuarioId,
          },
        },
      },
    });

    if (!flashcard) {
      throw new HttpError(404, "Flashcard não encontrado.");
    }

    const flashcardAtualizado = await prisma.flashcard.update({
      where: {
        id: flashcardId,
      },

      data: {
        frente,
        verso,
      },
    });

    return flashcardAtualizado;
  },

  deletar: async (usuarioId: number, flashcardId: number) => {
    const flashcard = await prisma.flashcard.findFirst({
      where: {
        id: flashcardId,

        materia: {
          is: {
            usuarioId,
          },
        },
      },
    });

    if (!flashcard) {
      throw new HttpError(404, "Flashcard não encontrado.");
    }

    await prisma.flashcard.delete({
      where: {
        id: flashcardId,
      },
    });
  },
};
