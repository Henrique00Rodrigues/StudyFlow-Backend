import type { Request, Response, NextFunction } from "express";

import { HttpError } from "../../errors/HttpError.js";
import { verificarToken } from "../../utils/jwt.js";

export function autenticarUsuario(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new HttpError(401, "Token de autenticação não enviado.");
  }

  const [tipo, token] = authorization.split(" ");

  if (tipo !== "Bearer" || !token) {
    throw new HttpError(401, "Token de autenticação inválido.");
  }

  try {
    const usuario = verificarToken(token);

    req.user = {
      id: usuario.id,
    };

    next();
  } catch {
    throw new HttpError(401, "Token inválido ou expirado.");
  }
}
