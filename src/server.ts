import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

import { mainRouter } from './routes/main';
import { authenticateJWT } from './middlewares/authenticateJWT';  // importe o middleware

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

// Rotas públicas
server.use('/', mainRouter);

// Rotas de autenticação

// Rota protegida - só acessa se estiver autenticado
server.get('/perfil', authenticateJWT, (req, res) => {
  res.json({ message: `Olá, ${req.user?.name}!` });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
