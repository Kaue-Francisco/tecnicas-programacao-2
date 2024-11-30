import ListagemTitulares from "../listagem/listagemTitulares";
import Armazem from "../../dominio/armazem";

export default class DeletarTitular extends ListagemTitulares {
    processar(): void {
        let listar = new ListagemTitulares();

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

        let armazem = Armazem.InstanciaUnica;
        armazem.removerCliente(titular);

        console.log(`Cliente titular ${titular.Nome} deletado com sucesso.`);
    }
}
