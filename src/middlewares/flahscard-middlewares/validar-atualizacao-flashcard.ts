import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarAtualizacaoFlashcard(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { frente, verso } = req.body;

  if (typeof frente !== "string" || typeof verso !== "string") {
    throw new HttpError(400, "Frente e verso devem ser strings.");
  }

  if (!frente.trim() || !verso.trim()) {
    throw new HttpError(400, "Frente e verso são obrigatórios.");
  }

  req.body.frente = frente.trim();
  req.body.verso = verso.trim();

  next();
}
