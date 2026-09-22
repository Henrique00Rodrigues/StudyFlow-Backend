import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

import materiaService from "../services/materia-service.js";

export default {
  listar: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    const materias = await materiaService.listar(usuarioId);

    return res.status(200).json({
      materias,
    });
  },

  criarMateria: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const { nome } = req.body;

    const materia = await materiaService.criar(usuarioId, {
      nome,
    });

    return res.status(201).json({
      mensagem: `Matéria de ${materia.nome} criada com sucesso.`,
      materia,
    });
  },

  atualizarMateria: async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const materiaId = +req.params.id;
    const { nome } = req.body;

    const materia = await materiaService.atualizar(usuarioId, materiaId, {
      nome,
    });

    return res.status(200).json({
      mensagem: "Matéria atualizada com sucesso.",
      materia,
    });
  },

  deletar: async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const materiaId = +req.params.id;

    await materiaService.deletar(usuarioId, materiaId);

    return res.sendStatus(204);
  },
};
