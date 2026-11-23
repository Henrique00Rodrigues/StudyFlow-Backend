import multer from "multer";
import { randomUUID } from "crypto";

import { HttpError } from "../../errors/HttpError.js";

const storage = multer.diskStorage({
  destination: "uploads/fotos-perfil",

  filename: (req, file, callback) => {
    let extensao = "";

    switch (file.mimetype) {
      case "image/jpeg":
        extensao = ".jpg";
        break;

      case "image/png":
        extensao = ".png";
        break;

      case "image/webp":
        extensao = ".webp";
        break;
    }

    const nomeArquivo = `${randomUUID()}${extensao}`;

    callback(null, nomeArquivo);
  },
});

export const uploadFotoPerfil = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (req, file, callback) => {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!tiposPermitidos.includes(file.mimetype)) {
      return callback(
        new HttpError(400, "A foto de perfil deve ser JPEG, PNG ou WEBP."),
      );
    }

    callback(null, true);
  },
});
