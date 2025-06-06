import { Prisma } from '../generated/prisma';
import { prisma } from './../libs/prisma';
import bcrypt from 'bcrypt';

export const createUser = async ({ name, email, password }: Prisma.UserCreateInput) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // agora salva a senha criptografada
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao criar usuário');
  }
};
