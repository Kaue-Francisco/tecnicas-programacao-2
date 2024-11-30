import Processo from "../abstracoes/processo";
import MenuTipoDeletarCliente from "../menus/menuTipoDeletarCliente";
import DeletarDependente from "./deletar/deletarDependente";
import DeletarTitular from "./deletar/deletarTitular";

export default class TipoDeletarCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoDeletarCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new DeletarTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new DeletarDependente()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}