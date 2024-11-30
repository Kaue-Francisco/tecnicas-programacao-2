import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemDependentes from "./listagem/listagemDependentes";
import ListagemTitulares from "./listagem/listagemTitulares";

export default class TipoListagemClientes extends Processo {
    private processo2: ListagemDependentes | undefined;

    constructor(){
        super()
        this.menu = new MenuTipoListagemClientes()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                if ((this.processo as ListagemTitulares).temTitulares()) {
                    this.processo.processar()
                } else {
                    console.log('')
                    console.log('**************************');
                    console.log('Não há clientes titulares!');
                    console.log('**************************');
                    console.log('')
                    return; // Exit the method to return to the initial menu
                }
                break;
            case 2:
                this.processo = new ListagemTitulares()
                if ((this.processo as ListagemTitulares).temTitulares()) {
                    console.clear()
                    let titulares = (this.processo as ListagemTitulares).exibirTitularesComIndice()
                    this.processo2 = new ListagemDependentes(titulares)
                    this.processo2.processar()
                } else {
                    console.log('')
                    console.log('**************************');
                    console.log('Não há clientes titulares!');
                    console.log('**************************');
                    console.log('')
                    return; // Exit the method to return to the initial menu
                }
                break;
            case 3:
                this.processo = new ListagemTitulares()
                if ((this.processo as ListagemTitulares).temTitulares()) {
                    console.clear()
                    let titulares = (this.processo as ListagemTitulares).exibirTitularesComIndice()
                    this.processo2 = new ListagemDependentes(titulares)
                    let dependentes = this.processo2.listarTodosDependentes()
                    if (dependentes.length === 0) {
                        console.log('Não há dependentes para listar.')
                        return; // Exit the method to return to the initial menu
                    }
                    let opcao = this.entrada.receberNumero('Digite o ID do dependente em que deseja ver o titular:');
                    if (opcao < 1 || opcao > dependentes.length) {
                        console.log('ID do dependente inválido');
                        return; // Exit the method to return to the initial menu
                    }
                    let dependente = dependentes[opcao - 1];
                    this.processo2.exibirTitularDeDependente(dependente)
                } else {
                    console.log('')
                    console.log('**************************');
                    console.log('Não há clientes titulares!');
                    console.log('**************************');
                    console.log('')
                    return; // Exit the method to return to the initial menu
                }
                break;
            default:
                console.log('Opção não entendida... :(')
        }
    }
}