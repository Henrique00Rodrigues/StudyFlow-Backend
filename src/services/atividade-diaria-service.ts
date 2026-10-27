import { prisma } from "../database/index.js";

export const atividadeDiariaService = {
  registrarFlashcardCriado: async (usuarioId: number) => {
    const hoje = new Date();

    const dataHoje = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
    );

    const atividade = await prisma.atividadeDiaria.upsert({
      where: {
        usuarioId_data: {
          usuarioId,
          data: dataHoje,
        },
      },

      update: {
        flashcardsCriados: {
          increment: 1,
        },
      },

      create: {
        usuarioId,
        data: dataHoje,
        flashcardsCriados: 1,
      },
    });

    return atividade;
  },

  registrarFlashcardRevisado: async (usuarioId: number) => {
    const hoje = new Date();

    const dataHoje = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
    );

    const atividade = await prisma.atividadeDiaria.upsert({
      where: {
        usuarioId_data: {
          usuarioId,
          data: dataHoje,
        },
      },

      update: {
        flashcardsRevisados: {
          increment: 1,
        },
      },

      create: {
        usuarioId,
        data: dataHoje,
        flashcardsRevisados: 1,
      },
    });

    return atividade;
  },

  registrarFlashcardCriadoExcluido: async (
    usuarioId: number,
    dataCriacao: Date,
  ) => {
    const dataCriacaoNormalizada = new Date(
      dataCriacao.getFullYear(),
      dataCriacao.getMonth(),
      dataCriacao.getDate(),
    );

    const atividade = await prisma.atividadeDiaria.updateMany({
      where: {
        usuarioId,
        data: dataCriacaoNormalizada,
      },

      data: {
        flashcardsCriadosExcluidos: {
          increment: 1,
        },
      },
    });

    return atividade;
  },

  listarPorMes: async (usuarioId: number, ano: number, mes: number) => {
    const inicioMes = new Date(ano, mes - 1, 1);
    const inicioProximoMes = new Date(ano, mes, 1);

    const atividades = await prisma.atividadeDiaria.findMany({
      where: {
        usuarioId,

        data: {
          gte: inicioMes,
          lt: inicioProximoMes,
        },
      },

      orderBy: {
        data: "asc",
      },
    });

    return atividades;
  },
};
