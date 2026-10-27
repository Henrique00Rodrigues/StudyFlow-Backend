import type { Request, Response } from "express";

import { atividadeDiariaService } from "../services/atividade-diaria-service.js";
import { HttpError } from "../errors/HttpError.js";

export const atividadeDiariaController = {
  listarPorMes: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    const ano = Number(req.query.ano);
    const mes = Number(req.query.mes);

    const atividades = await atividadeDiariaService.listarPorMes(
      usuarioId,
      ano,
      mes,
    );

    return res.status(200).json(atividades);
  },
};
