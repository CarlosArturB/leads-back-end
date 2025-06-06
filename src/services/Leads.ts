import { Prisma } from '../generated/prisma';
import { prisma } from './../libs/prisma';

export const createleads = async ({ name, email, phone, leadorigin  }: Prisma.LeadsCreateInput) => {
  try {
    const leads = await prisma.leads.create({
      data: { name, email, phone, leadorigin }
    });
    return leads;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao criar lead'); // ou retorne algo que seu controller saiba lidar
  }
};

export const getAllLeads = async () => {
  const leads = await prisma.leads.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      leadorigin: true,
    }
  });
  return leads;
};