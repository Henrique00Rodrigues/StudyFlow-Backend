import { prisma } from "../database/index.js";
import { HttpError } from "../errors/HttpError.js";

type AtualizarUsuarioData = {
  apelido?: string;
  fotoPerfilUrl?: string | null;
};

export default {
  buscarDados: async (usuarioId: number) => {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
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

    if (!usuario) {
      throw new HttpError(404, "Usuário não encontrado.");
    }

    return usuario;
  },

  atualizar: async (usuarioId: number, dados: AtualizarUsuarioData) => {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!usuarioExistente) {
      throw new HttpError(404, "Usuário não encontrado.");
    }

    const usuario = await prisma.usuario.update({
      where: {
        id: usuarioId,
      },

      data: {
        ...(dados.apelido !== undefined && {
          apelido: dados.apelido,
        }),

        ...(dados.fotoPerfilUrl !== undefined && {
          fotoPerfilUrl: dados.fotoPerfilUrl,
        }),
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

  deletar: async (usuarioId: number) => {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!usuarioExistente) {
      throw new HttpError(404, "Usuário não encontrado.");
    }

    if (usuarioExistente.tipo === "administrador") {
      throw new HttpError(
        403,
        "O administrador não pode excluir a própria conta.",
      );
    }

    await prisma.usuario.delete({
      where: {
        id: usuarioId,
      },
    });
  },
};
