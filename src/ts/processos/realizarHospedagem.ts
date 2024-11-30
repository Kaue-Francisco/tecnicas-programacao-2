import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorAcomodacao from "../impressores/impressorAcomodacao";
import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import ListagemAcomodacoes from "./listagem/listagemAcomodacoes";
import ListagemTitulares from "./listagem/listagemTitulares";

export default class realizarHospedagem extends Processo{
    private listaTitular: Cliente[]
    private acomodacoes!: Acomodacao[]
    private impressor!: Impressor
    constructor(){
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
        this.listaTitular = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
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

        let titular = titulares[opcao - 1];

        this.processo = new ListagemAcomodacoes();
        this.processo.processar();

        let acomodacao = this.entrada.receberNumero('Qual o ID da acomodação?');
        let acomodacaoEscolhida = this.acomodacoes[acomodacao - 1];
        
        titular.Acomodacao = acomodacaoEscolhida;

        if (titular.Dependentes.length > 0) {
            for (let i = 0; i < titular.Dependentes.length; i++) {
                let dependente = titular.Dependentes[i];
                dependente.Acomodacao = acomodacaoEscolhida;
            }
        }
    }
}