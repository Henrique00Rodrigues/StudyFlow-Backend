import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import materiaRoutes from "./routes/materiaRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const server = express();

server.use(express.json());

server.get("/api/", (req, res) => {
  res.json({ mensagem: "Hey" });
});

server.use("/api/usuarios", usuarioRoutes);
server.use("/api/materias", materiaRoutes);
server.use("/api/tarefas", tarefaRoutes);
server.use("/api/flashcards", flashcardRoutes);
server.use("/api/auth", authRoutes);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}...`);
});
