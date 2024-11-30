import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class TelefoneService {
  public async cadastroTelefone(titularId: number, numero: string, ddd: string) {
    try {
      return prisma.telefone.create({
        data: {
          numero: numero,
          ddd: ddd,
          clienteId: titularId
        }
      });
    } catch (error) {
      throw new Error('Erro ao cadastrar telefone');
    }
  }
}