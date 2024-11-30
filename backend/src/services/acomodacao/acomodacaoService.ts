import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class AcomodacaoSerice {

    public async cadastroAcomodacao(clienteId: number, acomodacao: string) {
        try {
            return prisma.acomodacao.create({
                data: {
                    tipo: acomodacao,
                    clienteId: clienteId,
                }
            });
        } catch (error) {
            throw new Error('Erro ao cadastrar acomodação');
        }
    }

}