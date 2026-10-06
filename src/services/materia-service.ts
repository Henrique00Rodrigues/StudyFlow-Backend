import { prisma } from "../database/index.js";
import { HttpError } from "../errors/HttpError.js";

type CriarMateriaData = {
  nome: string;
};

type AtualizarMateriaData = {
  nome: string;
};

export default {
  listar: async (usuarioId: number) => {
    const materias = await prisma.materia.findMany({
      where: {
        usuarioId,
      },

      orderBy: {
        id: "asc",
      },
    });

    return materias;
  },

  buscarPorId: async (usuarioId: number, materiaId: number) => {
    const materia = await prisma.materia.findFirst({
      where: {
        id: materiaId,
        usuarioId,
      },
    });

    if (!materia) {
      throw new HttpError(404, "Matéria não encontrada.");
    }

    return materia;
  },

  criar: async (usuarioId: number, { nome }: CriarMateriaData) => {
    const materiaExistente = await prisma.materia.findFirst({
      where: {
        nome,
        usuarioId,
      },
    });

    if (materiaExistente) {
      throw new HttpError(409, "Você já possui uma matéria com esse nome.");
    }

    const materia = await prisma.materia.create({
      data: {
        nome,
        usuarioId,
      },
    });

    return materia;
  },

  atualizar: async (
    usuarioId: number,
    materiaId: number,
    { nome }: AtualizarMateriaData,
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

    const materiaMesmoNome = await prisma.materia.findFirst({
      where: {
        nome,
        usuarioId,

        NOT: {
          id: materiaId,
        },
      },
    });

    if (materiaMesmoNome) {
      throw new HttpError(409, "Você já possui uma matéria com esse nome.");
    }

    const materiaAtualizada = await prisma.materia.update({
      where: {
        id: materiaId,
      },

      data: {
        nome,
      },
    });

    return materiaAtualizada;
  },

  deletar: async (usuarioId: number, materiaId: number) => {
    const materia = await prisma.materia.findFirst({
      where: {
        id: materiaId,
        usuarioId,
      },
    });

    if (!materia) {
      throw new HttpError(404, "Matéria não encontrada.");
    }

    await prisma.materia.delete({
      where: {
        id: materiaId,
      },
    });
  },
};
