import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";
import tarefaService from "../services/tarefa-service.js";

export default {
  listarGlobalmente: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    const tarefas = await tarefaService.listarGlobalmente(usuarioId);

    return res.status(200).json({
      tarefas,
    });
  },

  listarTarefasMateria: async (
    req: Request<{ materiaId: string }>,
    res: Response,
  ) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const materiaId = +req.params.materiaId;

    const resultado = await tarefaService.listarTarefasMateria(
      usuarioId,
      materiaId,
    );

    return res.status(200).json({
      materia: resultado.materia,
      tarefas: resultado.tarefas,
    });
  },

  criar: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    const { titulo, descricao, prioridade, dataEntrega, materiaId } = req.body;

    const tarefa = await tarefaService.criar(usuarioId, {
      titulo,
      descricao,
      prioridade,
      dataEntrega,
      materiaId,
    });

    return res.status(201).json({
      mensagem: "Tarefa criada com sucesso.",
      tarefa,
    });
  },

  atualizar: async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const tarefaId = +req.params.id;

    const { titulo, descricao, prioridade, concluida, dataEntrega } = req.body;

    const tarefa = await tarefaService.atualizar(usuarioId, tarefaId, {
      titulo,
      descricao,
      prioridade,
      concluida,
      dataEntrega,
    });

    return res.status(200).json({
      mensagem: "Tarefa atualizada com sucesso.",
      tarefa,
    });
  },

  deletar: async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const tarefaId = +req.params.id;

    await tarefaService.deletar(usuarioId, tarefaId);

    return res.sendStatus(204);
  },
};
