import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DocumentoService {
  public async cadastroDocumento(titularId: number, tipo: string, numero: string, dataEmissao: string) {
    try {
      return prisma.documento.create({
        data: {
          tipo: tipo,
          numero: numero,
          dataEmissao: dataEmissao,
          clienteId: titularId
        }
      });
    } catch (error) {
      throw new Error('Erro ao cadastrar documento');
    }
  }
}