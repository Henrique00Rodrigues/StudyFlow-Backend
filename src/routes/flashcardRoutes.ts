import express from "express";
import flashcardController from "../controllers/flashcard-controller.js";

const router = express.Router();

// Listar todos os flashcards do usuário logado. OBS: PROVAVELMENTE NÃO SERÁ USADO
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      frente: "O que é uma chave primária?",
      verso: "É um campo que identifica unicamente um registro.",
      acertos: 0,
      erros: 0,
      acertosConsecutivos: 0,
      materiaId: 1,
    },
  ]);
});

// Listar flashcards de uma matéria específica
router.get("/materia/:materiaId", flashcardController.listarFlashcardsMateria);

// Buscar um flashcard específico. OBS: PROVAVELMENTE NÃO SERÁ USADO
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    frente: "O que é PostgreSQL?",
    verso: "Um sistema gerenciador de banco de dados relacional.",
    acertos: 0,
    erros: 0,
    acertosConsecutivos: 0,
    materiaId: 1,
  });
});

// Criar flashcard
router.post("/", flashcardController.criar);

// Atualizar flashcard
router.patch("/:id", flashcardController.atualizar);

// Excluir flashcard
router.delete("/:id", flashcardController.deletar);

export default router;
