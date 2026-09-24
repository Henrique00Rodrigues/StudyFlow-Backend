import type { Request, Response, NextFunction } from "express";

import { HttpError } from "../../errors/HttpError.js";
import { verificarToken } from "../../utils/jwt.js";
import { AUTH_COOKIE_NAME } from "../../config/auth-cookie.js";

export function autenticarUsuario(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token || typeof token !== "string") {
    throw new HttpError(401, "Usuário não autenticado.");
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
