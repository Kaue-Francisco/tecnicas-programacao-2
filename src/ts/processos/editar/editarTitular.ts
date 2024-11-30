// Classe EditarClienteTitular
import Processo from "../../abstracoes/processo";
import ListagemTitulares from "../listagem/listagemTitulares";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import MenuTipoDocumento from '../../menus/menuTipoDocumento';
import CadastroCPF from "../cadastro/cadastroCPF";
import CadastroRg from "../cadastro/cadastroRg";
import CadastroPassaporte from "../cadastro/cadastrarPassaporte";
import { TipoDocumento } from "../../enumeracoes/tipoDocumento";

export default class EditarClienteTitular extends Processo {
    processar(): void {
        console.log("Escolha o titular que deseja editar:");
        let listar = new ListagemTitulares();
        let armazem = Armazem.InstanciaUnica;

        if (!listar.temTitulares()) {
            console.log('')
            console.log('**************************');
            console.log('Não há clientes titulares!');
            console.log('**************************');
            console.log('')
            return;
        }

        let titulares = listar.exibirTitularesComIndice();
        let opcao = this.entrada.receberNumero('Qual o ID do cliente titular?');

        if (opcao < 1 || opcao > titulares.length) {
            console.log('ID do cliente titular inválido');
            return;
        }

        let titular = titulares[opcao - 1];
        let cliente = armazem.Clientes.find(c => c === titular);

        if (!cliente) {
            console.log('Cliente não encontrado');
            return;
        }

        let nome: string = cliente.Nome;
        let nomeSocial: string = cliente.NomeSocial;
        let dataNascimento: Date = cliente.DataNascimento;
        let telefones: Telefone[] = cliente.Telefones;
        let endereco: Endereco = cliente.Endereco;
        let documentos: Documento[] = cliente.Documentos;
        let dependentes: Cliente[] = cliente.Dependentes;

        console.log("Qual campo deseja editar?");
        console.log("1 - Nome");
        console.log("2 - Nome Social");
        console.log("3 - Data de nascimento");
        console.log("4 - Telefone");
        console.log("5 - Endereço");
        console.log("6 - Documentos");

        let campo = this.entrada.receberNumero('Digite o número do campo que deseja editar:');
        switch (campo) {
            case 1:
                nome = this.entrada.receberTexto('Digite o novo nome:');
                break;
            case 2:
                nomeSocial = this.entrada.receberTexto('Digite o novo nome social:');
                break;
            case 3:
                dataNascimento = new Date(this.entrada.receberTexto('Digite a nova data de nascimento (AAAA-MM-DD):'));
                break;
            case 4:
                let opcao = this.entrada.receberTexto('Você deseja adicionar (A) ou remover (R) um telefone?');

                if (opcao.toUpperCase() === 'A') {
                    let quantidade = this.entrada.receberNumero('Quantos telefones deseja adicionar?');
                    for (let i = 0; i < quantidade; i++) {
                        let ddd = this.entrada.receberTexto('Digite o DDD:');
                        let numero = this.entrada.receberTexto('Digite o número:');

                        telefones.push(new Telefone(ddd, numero));
                    }
                } else if (opcao.toUpperCase() === 'R') {
                    if (telefones.length > 0) {
                        for (let i = 0; i < telefones.length; i++) {
                            console.log(`ID: ${i + 1}`);
                            console.log(`DDD: ${telefones[i].Ddd}`);
                            console.log(`Número: ${telefones[i].Numero}`);
                        }
        
                        let opcao = this.entrada.receberNumero('Digite o ID do telefone que deseja remover:');

                        if (opcao < 1 || opcao > telefones.length) {
                            console.log('ID do telefone inválido');
                            return;
                        }

                        telefones.splice(opcao - 1, 1);
                    } else {
                        console.log('Não há telefones para remover.');
                    }
                }
                
                dependentes.forEach(dependente => {
                    dependente.Telefones = telefones;
                });
                break;
            case 5:
                endereco = new Endereco(
                    this.entrada.receberTexto('Digite a nova rua:'),
                    this.entrada.receberTexto('Digite o novo bairro:'),
                    this.entrada.receberTexto('Digite a nova cidade:'),
                    this.entrada.receberTexto('Digite o novo estado:'),
                    this.entrada.receberTexto('Digite o novo país:'),
                    this.entrada.receberTexto('Digite o novo código postal:')
                );
                break;
            case 6:
                let opcaoDocumento = this.entrada.receberTexto('Você deseja adicionar (A) ou remover (R) um documento?');
                let menu = new MenuTipoDocumento()
                let numeroDocumento = null;
                let dataExpedicao = null;

                if (opcaoDocumento.toUpperCase() === 'A') {
                    let quantidade = this.entrada.receberNumero('Quantos documentos deseja adicionar?');

                    for (let i = 0; i < quantidade; i++) {
                        menu.mostrar()
                        let tipoDocumento = this.entrada.receberNumero('Qual é o tipo de documento que você deseja?')
                    
                        switch (tipoDocumento) {
                            case 1:
                                numeroDocumento = this.entrada.receberNumero('Qual o número do documento?')
                                dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')

                                let cpf = new Documento(numeroDocumento, TipoDocumento.CPF, dataExpedicao)
                                documentos.push(cpf)
                                break;
                            case 2:
                                numeroDocumento = this.entrada.receberNumero('Qual o número do documento?')
                                dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')

                                let rg = new Documento(numeroDocumento, TipoDocumento.RG, dataExpedicao)
                                documentos.push(rg)
                                break;
                            case 3:
                                numeroDocumento = this.entrada.receberNumero('Qual o número do documento?')
                                dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')

                                let passaporte = new Documento(numeroDocumento, TipoDocumento.Passaporte, dataExpedicao)
                                documentos.push(passaporte)
                                break;
                            default:
                                console.log('Não foi possível encontrar esta opção.')
                        }
                    }
                } else if (opcaoDocumento.toUpperCase() === 'R') {
                    if (documentos.length > 0) {
                        for (let i = 0; i < documentos.length; i++) {
                            console.log(`ID: ${i + 1}`);
                            console.log(`Tipo: ${documentos[i].Tipo}`);
                            console.log(`Número: ${documentos[i].Numero}`);
                        }
        
                        let opcao = this.entrada.receberNumero('Digite o ID do documento que deseja remover:');

                        if (opcao < 1 || opcao > documentos.length) {
                            console.log('ID do documento inválido');
                            return;
                        }

                        documentos.splice(opcao - 1, 1);
                    } else {
                        console.log('Não há documentos para remover.');
                    }
                }
                break;
            default:
                console.log('Opção inválida');
                return;
        }

        let newCliente = new Cliente(nome, nomeSocial, dataNascimento);
        newCliente.Telefones = telefones;
        newCliente.Endereco = endereco;
        newCliente.Documentos = documentos;
        newCliente.Dependentes = dependentes;

        let index = armazem.Clientes.indexOf(cliente);
        if (index !== -1) {
            armazem.Clientes[index] = newCliente;
        }

        console.log('Cliente editado com sucesso!');
    }
}