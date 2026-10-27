import { Router } from "express";

import { atividadeDiariaController } from "../controllers/atividade-diaria-controller.js";
import { validarPeriodoAtividade } from "../middlewares/atividade-diaria-middlewares/validar-periodo-atividade.js";

const router = Router();

router.get(
  "/",
  validarPeriodoAtividade,
  atividadeDiariaController.listarPorMes,
);

export default router;
