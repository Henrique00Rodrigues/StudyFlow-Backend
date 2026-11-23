import { prisma } from "../database/index.js";
import { HttpError } from "../errors/HttpError.js";
import fs from "fs/promises";
import path from "path";

type AtualizarUsuarioData = {
  apelido?: string;
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

    if (
      usuarioExistente.fotoPerfilUrl &&
      usuarioExistente.fotoPerfilUrl.startsWith("/uploads/fotos-perfil/")
    ) {
      const caminhoFotoPerfil = path.join(
        process.cwd(),
        usuarioExistente.fotoPerfilUrl.replace(/^\/+/, ""),
      );

      try {
        await fs.unlink(caminhoFotoPerfil);
      } catch (error) {
        console.error("Erro ao excluir foto de perfil:", error);
      }
    }
  },

  atualizarFotoPerfil: async (usuarioId: number, fotoPerfilUrl: string) => {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      select: {
        fotoPerfilUrl: true,
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
        fotoPerfilUrl,
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

    if (
      usuarioExistente.fotoPerfilUrl &&
      usuarioExistente.fotoPerfilUrl.startsWith("/uploads/fotos-perfil/")
    ) {
      const caminhoFotoAntiga = path.join(
        process.cwd(),
        usuarioExistente.fotoPerfilUrl.replace(/^\/+/, ""),
      );

      try {
        await fs.unlink(caminhoFotoAntiga);
      } catch (error) {
        console.error("Erro ao excluir foto de perfil antiga:", error);
      }
    }

    return usuario;
  },
};
