import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  listarFlashcardsMateria: (
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
      flashcards: [],
    });
  },

  criar: (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const { frente, verso, materiaId } = req.body;

    return res.status(201).json({
      mensagem: "Flashcard criado com sucesso.",
      flashcard: {
        frente,
        verso,
        acertos: 0,
        erros: 0,
        acertosConsecutivos: 0,
        materiaId,
      },
    });
  },

  atualizar: (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const id = +req.params.id;
    const { frente, verso } = req.body;

    return res.status(200).json({
      mensagem: "Flashcard atualizado com sucesso.",
      flashcard: {
        id,
        frente,
        verso,
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
