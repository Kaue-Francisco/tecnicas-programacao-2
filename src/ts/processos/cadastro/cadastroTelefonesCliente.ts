import Processo from "../../abstracoes/processo";
import MenuTipoTelefone from "../../menus/menuTipoTelefone";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default class CadastrarTelefonesCliente extends Processo {
    private cliente: Cliente;
    private quantidade: number;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoTelefone();
        this.execucao = true;
    }

    processar(): void {
        console.log('Iniciando o cadastro de telefones...');
        let telefones = [];
        while (this.execucao) {
            this.menu.mostrar();
            this.quantidade = this.entrada.receberNumero('');
            if (this.quantidade < 1) {
                console.log('Quantidade inválida');
                return;
            }
            for (let i = 0; i < this.quantidade; i++) {
                let ddd = this.entrada.receberTexto('Qual o DDD?');
                let numero = this.entrada.receberNumero('Qual o número?').toString();
                let telefone = new Telefone(ddd, numero);
                telefones.push(telefone);
            }

            this.cliente.Telefones.push(...telefones);
            this.execucao = false;
        }
    }
}