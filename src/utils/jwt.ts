import jwt from "jsonwebtoken";

function obterJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não foi definida.");
  }

  return secret;
}

const JWT_SECRET = obterJwtSecret();

export function gerarToken(usuarioId: number) {
  return jwt.sign(
    {
      id: usuarioId,
    },
    JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    },
  );
}

export function verificarToken(token: string) {
  const payload = jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });

  if (typeof payload === "string" || typeof payload.id !== "number") {
    throw new Error("Payload do token inválido.");
  }

  return {
    id: payload.id,
  };
}
