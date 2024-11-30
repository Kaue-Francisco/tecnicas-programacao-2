import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class EnderecoService {
    public async cadastroEndereco(
        titularId: number,
        rua: string,
        pais: string,
        bairro: string,
        cidade: string,
        estado: string,
        cep: string
    ) {
        try {
            // Cria o endereço
            const novoEndereco = await prisma.endereco.create({
                data: {
                    rua,
                    bairro,
                    cidade,
                    estado,
                    pais,
                    cep,
                },
            });

            // Atualiza o cliente titular com o endereço criado
            await prisma.clientetitular.update({
                where: { id: titularId },
                data: { enderecoId: novoEndereco.id },
            });

            return novoEndereco;
        } catch (error) {
            throw new Error(`Erro ao cadastrar endereço!`);
        }
    }
}
