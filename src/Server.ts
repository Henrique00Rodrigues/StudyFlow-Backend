import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import materiaRoutes from "./routes/materiaRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import cors from "cors";
import cookieParser from "cookie-parser";

import { erroHandlerMiddleware } from "./middlewares/erro-handler.js";
import { autenticarUsuario } from "./middlewares/auth-middlewares/autenticar-usuario.js";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

server.use(cookieParser());

server.use(express.json());

server.get("/api/", (req, res) => {
  res.json({ mensagem: "Hey" });
});

server.use("/api/usuarios", autenticarUsuario, usuarioRoutes);
server.use("/api/materias", autenticarUsuario, materiaRoutes);
server.use("/api/tarefas", autenticarUsuario, tarefaRoutes);
server.use("/api/flashcards", autenticarUsuario, flashcardRoutes);
server.use("/api/auth", authRoutes);

server.use(erroHandlerMiddleware);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}...`);
});
