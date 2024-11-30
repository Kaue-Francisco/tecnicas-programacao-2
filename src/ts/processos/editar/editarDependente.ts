// Classe EditarDependente
import Processo from "../../abstracoes/processo";
import ListagemTitulares from "../listagem/listagemTitulares";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";

export default class EditarDependente extends Processo {
    processar(): void {
        console.log("Escolha o titular do dependente que deseja editar:");
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
            console.log('Cliente titular não encontrado');
            return;
        }

        if (cliente.Dependentes.length === 0) {
            console.log('O cliente titular não possui dependentes');
            return;
        }

        console.log("Escolha o dependente que deseja editar:");
        cliente.Dependentes.forEach((dependente, index) => {
            console.log(`${index + 1} - ${dependente.Nome}`);
        });

        let opcaoDependente = this.entrada.receberNumero('Qual o ID do dependente?');

        if (opcaoDependente < 1 || opcaoDependente > cliente.Dependentes.length) {
            console.log('ID do dependente inválido');
            return;
        }

        let dependente = cliente.Dependentes[opcaoDependente - 1];

        let nome: string = dependente.Nome;
        let nomeSocial: string = dependente.NomeSocial;
        let dataNascimento: Date = dependente.DataNascimento;
        let documentos: Documento[] = dependente.Documentos;

        console.log("Qual campo deseja editar?");
        console.log("1 - Nome");
        console.log("2 - Nome Social");
        console.log("3 - Data de nascimento");

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
            default:
                console.log('Opção inválida');
                return;
        }

        let newDependente = new Cliente(nome, nomeSocial, dataNascimento);
        newDependente.Documentos = documentos;
        newDependente.Endereco = cliente.Endereco;
        newDependente.Telefones = cliente.Telefones;

        let index = cliente.Dependentes.indexOf(dependente);
        if (index !== -1) {
            cliente.Dependentes[index] = newDependente;
        }

        console.log('Dependente editado com sucesso!');
    }
}