import { Request, Response } from "express";
import { ClienteService } from "../../services/cliente/clienteService";
import { EnderecoService } from "../../services/endereco/enderecoService";
import { TelefoneService } from "../../services/telefone/telefoneService";
import { DocumentoService } from "../../services/documento/documentoService";

const clienteService = new ClienteService();
const enderecoService = new EnderecoService();
const telefoneService = new TelefoneService();
const documentoService = new DocumentoService();

export default class ClienteTitularController {
    
    public async cadastro(request: Request, response: Response) {
        try {
            const { nome, nomeSocial, dataNasc, endereco, telefone, documentos} = request.body;
            const cliente = await clienteService.cadastroClienteTitular(nome, nomeSocial, dataNasc);
            
            if (endereco) {
                await enderecoService.cadastroEndereco(cliente.id, endereco.rua, endereco.pais, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep);
            }

            if (telefone) {
                for (const { ddd, numero } of telefone) {
                    await telefoneService.cadastroTelefone(cliente.id, numero, ddd);
                }
            }

            if (documentos) {
                for (const { tipo, numero, dataEmissao } of documentos) {
                    await documentoService.cadastroDocumento(cliente.id, tipo, numero, dataEmissao);
                }
            }

            return response.status(201).json({message:"Cliente titular cadastrado com sucesso!", cliente});
        } catch (error) {
            if (!response.headersSent) {
                return response.status(500).json({ error: 'Erro ao cadastrar cliente titular' });
            }
        }
    }

    public async cadastroDependente(request: Request, response: Response) {
        try {
            const { nome, nomeSocial, dataNasc, cpf } = request.body;
            const clienteTitular = await clienteService.buscarClientePorCpf(cpf);
            const cliente = await clienteService.cadastroClienteDependente(nome, nomeSocial, dataNasc, Number(clienteTitular?.id));
            return response.status(201).json({message:"Cliente dependente cadastrado com sucesso!", cliente});
        } catch (error) {
            if (!response.headersSent) {
                return response.status(500).json({ error: 'Erro ao cadastrar cliente dependente' });
            }
        }
    }

    public async deletar(request: Request, response: Response) {
        try {
            const { cpf } = request.body;
            const cliente = await clienteService.buscarClientePorCpf(cpf);

            await clienteService.deletarClienteTitular(cliente);
            return response.status(200).json({message:"Cliente titular deletado com sucesso!"});
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao deletar cliente titular' });
            }
        }
    }

    public async todosClienteTitulares(request: Request, response: Response) {
        try {
            const clientes = await clienteService.todosClienteTitulares();
            return response.status(200).json(clientes);
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao buscar clientes titulares' });

            }
        }
    }

    public async todosDependeteDoTitular(request: Request, response: Response) {
        try {
            const { cpf } = request.body;
            const clienteTitular = await clienteService.buscarClientePorCpf(cpf);

            const dependentes = await clienteService.todosDependentesDoTitular(Number(clienteTitular?.id));
            return response.status(200).json(dependentes);
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao buscar dependentes do titular' });
            }
        }
    }

    public async buscarTodosDependentes(request: Request, response: Response) {
        try {
            const dependentes = await clienteService.todosDependentes();
            return response.status(200).json(dependentes);
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao buscar dependentes' });
            }
        }
    }

    public async buscarTitularDependente(request: Request, response: Response) {
        try {
            const { titularId } = request.body;
            const titular = await clienteService.buscarTitularDependente(Number(titularId));
            const dadosCliente = await clienteService.buscarTodosDadosCLienteTitular(titular);
            return response.status(200).json(dadosCliente);
        } catch (error) {
            if (!response.headersSent) {    
                console.error(error);
                return response.status(500).json({ error: 'Erro ao buscar titular do dependente' });
            }
        }
    }

    public async bucasDependentesPorTitular(request: Request, response: Response) {
        try {
            const { cpf } = request.body;
            const clienteTitular = await clienteService.buscarClientePorCpf(cpf);
            const dependentes = await clienteService.todosDependentesDoTitular(Number(clienteTitular?.id));
            return response.status(200).json(dependentes);
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao buscar dependentes do titular' });
            }
        }
    }

    public async deletarDependente(request: Request, response: Response) {
        try {
            const { dependenteId } = request.body;
            await clienteService.deletarDependente(dependenteId);
            return response.status(200).json({message:"Cliente dependente deletado com sucesso!"});
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao deletar cliente dependente' });
            }
        }
    }

    public async editarClienteTitular(request: Request, response: Response) {
        try {
            const { id, nome, nomeSocial, dataNasc, cpf } = request.body;
            const cliente = await clienteService.buscarClientePorCpf(cpf);
            await clienteService.editarClienteTitular(id, nome, nomeSocial, dataNasc);
            return response.status(200).json({message:"Cliente titular editado com sucesso!"});
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao editar cliente titular' });
            }
        }
    }

    public async buscar(request: Request, response: Response) {
        try {
            const { cpf } = request.body;
            const cliente = await clienteService.buscarClientePorCpf(cpf);
            return response.status(200).json(cliente);
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao buscar cliente por cpf' });
            }
        }
    }

    public async editarTitular(request: Request, response: Response) {
        try {
            const { id, nome, nomeSocial, dataNasc } = request.body;
            await clienteService.editarClienteTitular(id, nome, nomeSocial, dataNasc);
            return response.status(200).json({message:"Cliente titular editado com sucesso!"});
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao editar cliente titular' });
            }
        }
    }

    public async editarDependente(request: Request, response: Response) {
        try {
            const { id, nome, nomeSocial, dataNasc } = request.body;
            console.log(id, nome, nomeSocial, dataNasc);
            await clienteService.editarClienteDepedente(id, nome, nomeSocial, dataNasc);
            return response.status(200).json({message:"Cliente titular editado com sucesso!"});
        } catch (error) {
            if (!response.headersSent) {
                console.error(error);
                return response.status(500).json({ error: 'Erro ao editar cliente titular' });
            }
        }
    }

}