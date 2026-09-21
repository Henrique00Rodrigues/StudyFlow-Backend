import type { Request, Response, NextFunction } from "express";

import { HttpError } from "../../errors/HttpError.js";

export function validarAtualizacaoUsuario(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { apelido, fotoPerfilUrl } = req.body;

  if (apelido === undefined && fotoPerfilUrl === undefined) {
    throw new HttpError(400, "Nenhum campo foi enviado para atualização.");
  }

  if (apelido !== undefined) {
    if (typeof apelido !== "string") {
      throw new HttpError(400, "O apelido deve ser do tipo string.");
    }

    if (!apelido.trim()) {
      throw new HttpError(400, "O apelido não pode estar vazio.");
    }

    if (apelido.trim().length > 30) {
      throw new HttpError(400, "O apelido deve ter no máximo 30 caracteres.");
    }

    req.body.apelido = apelido.trim();
  }

  if (fotoPerfilUrl !== undefined) {
    if (typeof fotoPerfilUrl !== "string" && fotoPerfilUrl !== null) {
      throw new HttpError(400, "A foto de perfil é inválida.");
    }
  }

  next();
}
