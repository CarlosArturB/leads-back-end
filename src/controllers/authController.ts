import { Request, Response } from 'express';
import { loginUser } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser({ email, password });
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
};
