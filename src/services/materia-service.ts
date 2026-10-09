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

    // Busca o tipo do usuário para saber se os limites
    // de criação devem ser aplicados.
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },

      select: {
        tipo: true,
      },
    });

    if (!usuario) {
      throw new HttpError(404, "Usuário não encontrado.");
    }

    // Usuários comuns podem possuir no máximo 5 matérias.
    // Administradores não possuem limite.
    if (usuario.tipo === "comum") {
      const quantidadeMaterias = await prisma.materia.count({
        where: {
          usuarioId,
        },
      });

      if (quantidadeMaterias >= 5) {
        throw new HttpError(403, "Você atingiu o limite máximo de 5 matérias.");
      }
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
