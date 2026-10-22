import * as argon2 from "argon2";

import { prisma } from "../database/index.js";
import { HttpError } from "../errors/HttpError.js";
import { gerarToken } from "../utils/jwt.js";

type RegisterData = {
  apelido: string;
  email: string;
  senha: string;
};

type LoginData = {
  email: string;
  senha: string;
};

export default {
  register: async ({ apelido, email, senha }: RegisterData) => {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExistente) {
      throw new HttpError(409, "Este email já está cadastrado.");
    }

    const quantidadeUsuarios = await prisma.usuario.count();

    if (quantidadeUsuarios >= 10) {
      throw new HttpError(
        409,
        "O limite máximo de 10 usuários cadastrados foi atingido.",
      );
    }

    const senhaHash = await argon2.hash(senha, {
      type: argon2.argon2id,
    });

    const usuario = await prisma.usuario.create({
      data: {
        apelido,
        email,
        senha: senhaHash,
      },

      select: {
        id: true,
        apelido: true,
        email: true,
        tipo: true,
        dataCriacao: true,
        fotoPerfilUrl: true,
      },
    });

    return usuario;
  },

  login: async ({ email, senha }: LoginData) => {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      throw new HttpError(401, "Email ou senha incorretos.");
    }

    const senhaValida = await argon2.verify(usuario.senha, senha);

    if (!senhaValida) {
      throw new HttpError(401, "Email ou senha incorretos.");
    }

    const token = gerarToken(usuario.id);

    const { senha: _senha, ...usuarioSeguro } = usuario;

    return {
      usuario: usuarioSeguro,
      token,
    };
  },
};
