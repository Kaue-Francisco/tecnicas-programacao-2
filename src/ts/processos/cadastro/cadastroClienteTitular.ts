import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarTelefonesCliente from "./cadastroTelefonesCliente";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...');

        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let cliente = new Cliente(nome, nomeSocial, dataNascimento);

        // Processar cadastro de endereço
        let cadastroEndereco = new CadastroEnderecoTitular(cliente);
        cadastroEndereco.processar();

        // Processar cadastro de telefones
        let cadastroTelefones = new CadastrarTelefonesCliente(cliente);
        cadastroTelefones.processar();

        // Processar cadastro de documentos
        let cadastroDocumentos = new CadastrarDocumentosCliente(cliente);
        cadastroDocumentos.processar();

        // Adiciona o cliente ao armazém
        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(cliente);

        console.log('Finalizando o cadastro do cliente...');
    }
}
