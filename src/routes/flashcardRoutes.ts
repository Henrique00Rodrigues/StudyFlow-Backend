import express from "express";
import flashcardController from "../controllers/flashcard-controller.js";
import { validarIdMateriaFlashcard } from "../middlewares/flahscard-middlewares/validar-id-materia-flashcard.js";
import { validarCriacaoFlashcard } from "../middlewares/flahscard-middlewares/validar-criacao-flashcard.js";
import { validarIdFlashcard } from "../middlewares/flahscard-middlewares/validar-id-flashcard.js";
import { validarAtualizacaoFlashcard } from "../middlewares/flahscard-middlewares/validar-atualizacao-flashcard.js";
import { validarRevisaoFlashcard } from "../middlewares/flahscard-middlewares/validar-revisao-flashcard.js";

const router = express.Router();
// Listar todos os flashcards do usuário logado
router.get("/", flashcardController.listarGlobalmente);

// Listar flashcards de uma matéria específica
router.get(
  "/materia/:materiaId",
  validarIdMateriaFlashcard,
  flashcardController.listarFlashcardsMateria,
);

// Criar flashcard
router.post("/", validarCriacaoFlashcard, flashcardController.criar);

// Revisar flashcard
router.patch(
  "/:id/revisar",
  validarIdFlashcard,
  validarRevisaoFlashcard,
  flashcardController.revisar,
);

// Atualizar flashcard
router.patch(
  "/:id",
  validarIdFlashcard,
  validarAtualizacaoFlashcard,
  flashcardController.atualizar,
);

// Excluir flashcard
router.delete("/:id", validarIdFlashcard, flashcardController.deletar);

export default router;
