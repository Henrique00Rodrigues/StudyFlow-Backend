import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";
import flashcardService from "../services/flashcard-service.js";

export default {
  listarGlobalmente: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    const flashcards = await flashcardService.listarGlobalmente(usuarioId);

    return res.status(200).json({
      flashcards,
    });
  },

  listarFlashcardsMateria: async (
    req: Request<{ materiaId: string }>,
    res: Response,
  ) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const materiaId = +req.params.materiaId;

    const resultado = await flashcardService.listarFlashcardsMateria(
      usuarioId,
      materiaId,
    );

    return res.status(200).json({
      materia: resultado.materia,
      flashcards: resultado.flashcards,
    });
  },

  criar: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const { frente, verso, materiaId } = req.body;

    const flashcard = await flashcardService.criar(usuarioId, {
      frente,
      verso,
      materiaId,
    });

    return res.status(201).json({
      mensagem: "Flashcard criado com sucesso.",
      flashcard,
    });
  },

  atualizar: async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const flashcardId = +req.params.id;
    const { frente, verso } = req.body;

    const flashcard = await flashcardService.atualizar(usuarioId, flashcardId, {
      frente,
      verso,
    });

    return res.status(200).json({
      mensagem: "Flashcard atualizado com sucesso.",
      flashcard,
    });
  },

  deletar: async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const flashcardId = +req.params.id;

    await flashcardService.deletar(usuarioId, flashcardId);

    return res.sendStatus(204);
  },
};
