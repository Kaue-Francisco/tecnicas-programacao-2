import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorCliente from "../../impressores/impressorCliente"; // Fixed typo here
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemTitulares extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    temTitulares(): boolean {
        return this.clientes.length > 0;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem dos clientes titulares...');
        const titulares = this.clientes.filter(cliente => this.titular(cliente));
        if (titulares.length === 0) {
            console.log('')
            console.log('**************************');
            console.log('Não há clientes titulares!');
            console.log('**************************');
            console.log('')
        } else {
            titulares.forEach(cliente => {
                this.impressor = new ImpressorCliente(cliente); // Fixed typo here
                console.log(this.impressor.imprimir());
            });
        }
    }

    exibirTitularesComIndice(): Cliente[] {
        console.clear();
        console.log('Listagem de clientes titulares com índice:');
        const titulares = this.clientes.filter(cliente => this.titular(cliente));
        if (titulares.length === 0) {
            console.log('')
            console.log('**************************');
            console.log('Não há clientes titulares!');
            console.log('**************************');
            console.log('')
        } else {
            titulares.forEach((cliente, index) => {
                console.log(`${index + 1}. ${cliente.Nome}`);
            });
        }
        return titulares;
    }

    obterTitulares(): Cliente[] {
        return this.clientes.filter(cliente => this.titular(cliente));
    }

    obterTitularDeDependente(dependente: Cliente): Cliente {
        return this.clientes.find(cliente => cliente.Dependentes.includes(dependente));
    }

    private titular(cliente: Cliente): boolean {
        return cliente.Titular === undefined;
    }
}