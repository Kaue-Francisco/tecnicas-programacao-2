import Processo from "../abstracoes/processo";
import MenuTipoEditarClientes from "../menus/menuEditarCliente";
import EditarDependente from "./editar/editarDependente";
import EditarClienteTitular from "./editar/editarTitular";

export default class TipoEditarCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoEditarClientes()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new EditarClienteTitular();
                this.processo.processar();
                break
            case 2:
                this.processo = new EditarDependente()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}