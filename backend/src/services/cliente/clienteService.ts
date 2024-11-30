import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ClienteService {
    public async cadastroClienteTitular(nome: string, nomeSocial: string, dataNasc: string) {
        try {
        return prisma.clientetitular.create({
            data: {
            nome: nome,
            nomeSocial: nomeSocial,
            dataNasc: dataNasc
            }
        });
        } catch (error) {
            throw new Error('Erro ao cadastrar cliente titular');
        }
    }

    public async cadastroClienteDependente(nome: string, nomeSocial: string, dataNasc: string, clienteTitularId: number) {
        try {
            return prisma.clientedependente.create({
                data: {
                    nome: nome,
                    nomeSocial: nomeSocial,
                    dataNasc: dataNasc,
                    titularId: clienteTitularId
                }
            });
        } catch (error) {
            throw new Error('Erro ao cadastrar cliente dependente');
        }        
    }

    public async deletarClienteTitular(cliente: any) {
        try {
            await prisma.$transaction([
                prisma.documento.deleteMany({
                    where: { clienteId: cliente.id },
                }),
                prisma.telefone.deleteMany({
                    where: { clienteId: cliente.id },
                }),
                prisma.acomodacao.deleteMany({
                    where: { clienteId: cliente.id },
                }),
                prisma.clientetitular.delete({
                    where: { id: cliente.id },
                }),
                prisma.endereco.delete({
                    where: { id: cliente.enderecoId },  // Alteração aqui: usa delete, não deleteMany
                })
            ]);
            return { message: "Cliente e dados relacionados deletados com sucesso" };
        } catch (error: any) {
            throw new Error(`Erro ao deletar cliente titular e dados relacionados: ${error.message}`);
        }
    }

    public async buscarClientePorCpf(cpf: string) {
        try {
            const cliente = await prisma.documento.findFirst({
                where: {
                numero: cpf
                }, include: {
                    clientetitular: true
                }
            });

            return cliente?.clientetitular;
        } catch (error) {
        throw new Error('Erro ao buscar cliente titular');
        }
    }

    public async todosClienteTitulares() {
        try {
            return prisma.clientetitular.findMany();
        } catch (error) {
            throw new Error('Erro ao buscar clientes titulares');
        }
    }

    public async todosDependentesDoTitular(clienteTitularId: number) {
        try {
            return prisma.clientedependente.findMany({
                where: {
                    titularId: clienteTitularId
                }
            });
        } catch (error) {
            throw new Error('Erro ao buscar dependentes do titular');
        }
    }

    public async todosDependentes() {
        try {
            return prisma.clientedependente.findMany();
        } catch (error) {
            throw new Error('Erro ao buscar dependentes');
        }
    }

    public async buscarTitularDependente(id: number) {
        try {
            return prisma.clientetitular.findFirst({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error('Erro ao buscar titular do dependente');
        }
    }

    public async buscarTodosDadosCLienteTitular(cliente: any) {
        try {
            let dadosCliente = await prisma.$transaction([
                prisma.clientetitular.findFirst({
                    where: {
                        id: cliente.id
                    }
                }),
                prisma.documento.findFirst({
                    where: {
                        clienteId: cliente.id
                    }
                }),
                prisma.endereco.findFirst({
                    where: {
                        id: cliente.enderecoId
                    }
                }),
                prisma.telefone.findFirst({
                    where: {
                        clienteId: cliente.id
                    }
                })
            ]);

            return dadosCliente;
            
        } catch (error) {
            throw new Error('Erro ao buscar dados do cliente titular');
        }
    }

    public async deletarDependente(dependenteId: number) {
        console.log(dependenteId);
        try {
            await prisma.clientedependente.delete({
                where: {
                    id: dependenteId
                }
            });
        } catch (error) {
            throw new Error('Erro ao deletar dependente');
        }
    }

    public async editarClienteTitular(id: any, nome: string, nomeSocial: string, dataNasc: string) {
        try {
            await prisma.clientetitular.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    nomeSocial: nomeSocial,
                    dataNasc: dataNasc
                }
            });
            return { message: "Cliente titular editado com sucesso" };
        } catch (error) {
            throw new Error('Erro ao editar cliente titular');
        }
    }

    public async editarClienteDepedente(id: any, nome: string, nomeSocial: string, dataNasc: string) {
        try {
            await prisma.clientedependente.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    nomeSocial: nomeSocial,
                    dataNasc: dataNasc
                }
            });
            return { message: "Cliente dependente editado com sucesso" };
        } catch (error) {
            throw new Error('Erro ao editar cliente dependente');
        }
    }

}