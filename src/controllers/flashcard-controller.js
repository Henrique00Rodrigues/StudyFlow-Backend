const { atualizar } = require("./tarefa-controller");

module.exports = {
  listarFlashcardsMateria: (req, res) => {
    const materiaId = +req.params.materiaId;

    if (!Number.isInteger(materiaId) || materiaId <= 0) {
      return res.status(400).json({
        mensagem: "O ID da matéria é inválido.",
      });
    }

    return res.status(200).json({ materiaId, materia: ``, flashcards: [] });
  },

  criar: (req, res) => {
    const { frente, verso, materiaId } = req.body;

    if (typeof frente !== "string" || typeof verso !== "string") {
      return res.status(400).json({ mensagem: "Tipo dos campos inválido." });
    }

    if (!frente.trim() || !verso.trim()) {
      return res.status(400).json({
        mensagem: "Frente e verso são obrigatórios.",
      });
    }

    if (!Number.isInteger(materiaId) || materiaId <= 0) {
      return res.status(400).json({
        mensagem: "O ID da matéria é inválido.",
      });
    }

    return res.status(201).json({
      mensagem: "Flashcard criado com sucesso.",
      flashcard: {
        frente: frente.trim(),
        verso: verso.trim(),
        acertos: 0,
        erros: 0,
        acertosConsecutivos: 0,
        materiaId,
      },
    });
  },

  atualizar: (req, res) => {
    const id = +req.params.id;
    const { frente, verso } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID do flashcard é inválido.",
      });
    }

    if (typeof frente !== "string" || typeof verso !== "string") {
      return res.status(400).json({
        mensagem: "Frente e verso devem ser strings.",
      });
    }

    if (!frente.trim() || !verso.trim()) {
      return res.status(400).json({
        mensagem: "Frente e verso são obrigatórios.",
      });
    }

    return res.status(200).json({
      mensagem: "Flashcard atualizado com sucesso.",
      flashcard: { id, frente: frente.trim(), verso: verso.trim() },
    });
  },

  deletar: (req, res) => {
    const id = +req.params.id;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID do flashcard é inválido.",
      });
    }

    return res.sendStatus(204);
  },
};
