import { prisma } from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: Omit<
    {
      id: number;
      name: string;
      email: string;
      password: string;
      [key: string]: any;
    },
    'password'
  >;
}

export const loginUser = async ({ email, password }: LoginInput): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuário ou senha inválidos');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Usuário ou senha inválidos');

  const payload = { userId: user.id, email: user.email, name: user.name };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });

  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const verifyLoggedUser = async (token: string) => {
  if (!token) throw new Error('Token não fornecido');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; name: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
    if (!user) throw new Error('Usuário não encontrado');

    return { ...decoded, user };
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}
