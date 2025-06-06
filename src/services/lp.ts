import { Prisma } from '../generated/prisma';
import { prisma } from '../libs/prisma';

export const createlp = async ({name,url, status }: Prisma.LpCreateInput) => {
  try {
    const user = await prisma.lp.create({
      data: { name, url, status } // Certifique-se de que esses campos estão corretos
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao criar usuário'); // ou retorne algo que seu controller saiba lidar
  }
};

export const getAllLp = async () => {
  const lps = await prisma.lp.findMany({
    select: {
      id: true,
      name: true,
      url: true,
      status: true,
    }
  });
  return lps;
};
