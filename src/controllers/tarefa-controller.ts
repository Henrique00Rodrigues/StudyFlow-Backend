import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  listarGlobalmente: (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    return res.status(200).json({
      tarefas: [],
    });
  },

  listarTarefasMateria: (
    req: Request<{ materiaId: string }>,
    res: Response,
  ) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const materiaId = +req.params.materiaId;

    return res.status(200).json({
      materiaId,
      materia: "",
      tarefas: [],
    });
  },

  criar: (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const { titulo, descricao, prioridade, dataEntrega, materiaId } = req.body;

    return res.status(201).json({
      mensagem: "Tarefa criada com sucesso.",
      tarefa: {
        titulo,
        descricao,
        prioridade,
        concluida: false,
        dataEntrega,
        materiaId,
      },
    });
  },

  atualizar: (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const id = +req.params.id;

    const { titulo, descricao, prioridade, concluida, dataEntrega } = req.body;

    return res.status(200).json({
      mensagem: "Tarefa atualizada com sucesso.",
      tarefa: {
        id,
        titulo,
        descricao,
        prioridade,
        concluida,
        dataEntrega,
      },
    });
  },

  deletar: (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    return res.sendStatus(204);
  },
};
