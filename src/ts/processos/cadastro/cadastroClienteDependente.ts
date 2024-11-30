import Processo from "../../abstracoes/processo";
import Telefone from "../../modelos/telefone";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import ListagemTitulares from "../listagem/listagemTitulares";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log("Quem é o Cliente Titular?");
        let listar = new ListagemTitulares();
        
        if (!listar.temTitulares()) {
            console.log('')
            console.log('**************************');
            console.log('Não há clientes titulares!');
            console.log('**************************');
            console.log('')
            return; // Exit the method to return to the initial menu
        }
        
        let titulares = listar.exibirTitularesComIndice();
        
        let opcao = this.entrada.receberNumero('Qual o ID do cliente titular?');
        
        if (opcao < 1 || opcao > titulares.length) {
            console.log('ID do cliente titular inválido');
            return; // Exit the method to return to the initial menu
        }
        
        let titular = titulares[opcao - 1];
        let endereco = titular.Endereco.clonar() as Endereco;
        let telefones = titular.Telefones.map(tel => tel.clonar() as Telefone);
        
        let nome = this.entrada.receberTexto('Qual o nome do dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);

        this.processo = new CadastrarDocumentosCliente(dependente)
        this.processo.processar()

        dependente.Endereco = endereco;
        dependente.Telefones = telefones;
        dependente.Titular = titular;
        titular.Dependentes.push(dependente);
    
        console.log('Finalizando o cadastro do dependente...');
    }
}