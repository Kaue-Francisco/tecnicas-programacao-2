import Cliente from "../modelos/cliente";
import Acomodacao from "../modelos/acomodacao";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem();
    private clientes: Cliente[] = [];
    private acomodacoes: Acomodacao[] = [];
    private constructor() { }

    public static get InstanciaUnica() {
        return this.instanciaUnica;
    }

    public get Clientes() {
        return this.clientes;
    }

    public removerCliente(cliente: Cliente) {
        this.clientes = this.clientes.filter(c => c !== cliente);
    }

    public removerDependente(cliente: Cliente, dependente: Cliente) {
        let titular = this.clientes.find(c => c === cliente);

        for (let i = 0; i < titular.Dependentes.length; i++) {
            if (titular.Dependentes[i] === dependente) {
                titular.Dependentes.splice(i, 1);
                break;
            }
        }

        this.clientes = this.clientes.map(c => c === cliente ? titular : c);
    }   

    public get Acomodacoes(){
        return this.acomodacoes
    }
}
