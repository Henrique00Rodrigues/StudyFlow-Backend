import { prisma } from "../database/index.js";
import { HttpError } from "../errors/HttpError.js";

type CriarTarefaData = {
  titulo: string;
  descricao: string;
  prioridade: "baixa" | "media" | "alta";
  dataEntrega: string;
  materiaId: number;
};

type AtualizarTarefaData = {
  titulo: string;
  descricao: string;
  prioridade: "baixa" | "media" | "alta";
  concluida: boolean;
  dataEntrega: string;
};

export default {
  listarGlobalmente: async (usuarioId: number) => {
    const tarefas = await prisma.tarefa.findMany({
      where: {
        materia: {
          is: {
            usuarioId,
          },
        },
      },

      include: {
        // include adiciona dados das relações.
        // select escolhe quais campos dessa relação serão retornados.
        materia: {
          select: {
            id: true,
            nome: true,
          },
        },
      },

      orderBy: {
        dataEntrega: "asc",
      },
    });

    return tarefas;
  },

  listarTarefasMateria: async (usuarioId: number, materiaId: number) => {
    const materia = await prisma.materia.findFirst({
      where: {
        id: materiaId,
        usuarioId,
      },
    });

    if (!materia) {
      throw new HttpError(404, "Matéria não encontrada.");
    }

    const tarefas = await prisma.tarefa.findMany({
      where: {
        materiaId,
      },

      orderBy: {
        dataEntrega: "asc",
      },
    });

    return {
      materia,
      tarefas,
    };
  },

  criar: async (
    usuarioId: number,
    { titulo, descricao, prioridade, dataEntrega, materiaId }: CriarTarefaData,
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

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        prioridade,
        concluida: false,
        dataEntrega: new Date(`${dataEntrega}T00:00:00.000Z`),
        materiaId,
      },
    });

    return tarefa;
  },

  atualizar: async (
    usuarioId: number,
    tarefaId: number,
    {
      titulo,
      descricao,
      prioridade,
      concluida,
      dataEntrega,
    }: AtualizarTarefaData,
  ) => {
    const tarefa = await prisma.tarefa.findFirst({
      where: {
        id: tarefaId,

        materia: {
          is: {
            usuarioId,
          },
        },
      },
    });

    if (!tarefa) {
      throw new HttpError(404, "Tarefa não encontrada.");
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: {
        id: tarefaId,
      },

      data: {
        titulo,
        descricao,
        prioridade,
        concluida,
        dataEntrega: new Date(`${dataEntrega}T00:00:00.000Z`),
      },
    });

    return tarefaAtualizada;
  },

  deletar: async (usuarioId: number, tarefaId: number) => {
    const tarefa = await prisma.tarefa.findFirst({
      where: {
        id: tarefaId,

        materia: {
          is: {
            usuarioId,
          },
        },
      },
    });

    if (!tarefa) {
      throw new HttpError(404, "Tarefa não encontrada.");
    }

    await prisma.tarefa.delete({
      where: {
        id: tarefaId,
      },
    });
  },
};
