import ListagemDependentes from "../listagem/listagemDependentes";
import Armazem from "../../dominio/armazem";
import ListagemTitulares from "../listagem/listagemTitulares";

export default class DeletarDependente extends ListagemTitulares {
    processar(): void {
        let listagem = new ListagemTitulares();
        let titulares = listagem.obterTitulares();
        let listar = new ListagemDependentes(titulares);

        listar.listarTodosDependentes();
        let dependentes = listar.obterDependentes();

        if (dependentes.length === 0) {
            console.log('****************************');
            console.log('Não há clientes dependentes');
            console.log('****************************');
            return;
        }

        let opcao = this.entrada.receberNumero('Qual o ID do cliente dependente?');
        
        if (opcao < 1 || opcao > listar.obterDependentes().length) {
            console.log('ID do cliente dependente inválido');
            return;
        }

        let dependente = dependentes[opcao - 1];
        let titular = listagem.obterTitularDeDependente(dependente);

        let armazem = Armazem.InstanciaUnica;
        armazem.removerDependente(titular, dependente);
    }
}