import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarRevisaoFlashcard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { resultado } = req.body;

  if (!resultado) {
    throw new HttpError(400, "O resultado da revisão é obrigatório.");
  }

  if (resultado !== "acerto" && resultado !== "erro") {
    throw new HttpError(
      400,
      "O resultado da revisão deve ser 'acerto' ou 'erro'.",
    );
  }

  next();
}
