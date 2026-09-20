import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  listarFlashcardsMateria: (
    req: Request<{ materiaId: string }>,
    res: Response,
  ) => {
    const materiaId = Number(req.params.materiaId);

    if (!Number.isInteger(materiaId) || materiaId <= 0) {
      throw new HttpError(400, "O ID da matéria é inválido.");
    }

    return res.status(200).json({
      materiaId,
      materia: "",
      flashcards: [],
    });
  },

  criar: (req: Request, res: Response) => {
    const { frente, verso, materiaId } = req.body;

    if (typeof frente !== "string" || typeof verso !== "string") {
      throw new HttpError(400, "Tipo dos campos inválido.");
    }

    if (!frente.trim() || !verso.trim()) {
      throw new HttpError(400, "Frente e verso são obrigatórios.");
    }

    if (!Number.isInteger(materiaId) || materiaId <= 0) {
      throw new HttpError(400, "O ID da matéria é inválido.");
    }

    return res.status(201).json({
      mensagem: "Flashcard criado com sucesso.",
      flashcard: {
        frente: frente.trim(),
        verso: verso.trim(),
        acertos: 0,
        erros: 0,
        acertosConsecutivos: 0,
        materiaId,
      },
    });
  },

  atualizar: (req: Request<{ id: string }>, res: Response) => {
    const id = +req.params.id;
    const { frente, verso } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      throw new HttpError(400, "O ID do flashcard é inválido.");
    }

    if (typeof frente !== "string" || typeof verso !== "string") {
      throw new HttpError(400, "Frente e verso devem ser strings.");
    }

    if (!frente.trim() || !verso.trim()) {
      throw new HttpError(400, "Frente e verso são obrigatórios.");
    }

    return res.status(200).json({
      mensagem: "Flashcard atualizado com sucesso.",
      flashcard: {
        id,
        frente: frente.trim(),
        verso: verso.trim(),
      },
    });
  },

  deletar: (req: Request<{ id: string }>, res: Response) => {
    const id = +req.params.id;

    if (!Number.isInteger(id) || id <= 0) {
      throw new HttpError(400, "O ID do flashcard é inválido.");
    }

    return res.sendStatus(204);
  },
};
