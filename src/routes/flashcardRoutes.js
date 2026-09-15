const express = require("express");

const router = express.Router();

// Listar todos os flashcards do usuário logado
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
router.get("/materia/:materiaId", (req, res) => {
  const { materiaId } = req.params;

  res.json({
    materiaId,
    flashcards: [],
  });
});

// Buscar um flashcard específico
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
router.post("/", (req, res) => {
  const { frente, verso, materiaId } = req.body;

  res.status(201).json({
    mensagem: "Flashcard criado com sucesso.",
    flashcard: {
      frente,
      verso,
      acertos: 0,
      erros: 0,
      acertosConsecutivos: 0,
      materiaId,
    },
  });
});

// Atualizar flashcard
router.patch("/:id", (req, res) => {
  const { id } = req.params;

  const { frente, verso } = req.body;

  res.json({
    mensagem: "Flashcard atualizado com sucesso.",
    flashcard: {
      id,
      frente,
      verso,
    },
  });
});

// Excluir flashcard
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    mensagem: `Flashcard ${id} excluído com sucesso.`,
  });
});

module.exports = router;
