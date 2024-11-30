import Processo from "../../abstracoes/processo";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private titulares: Cliente[]
    private impressor!: Impressor

    constructor(titulares: Cliente[]) {
        super()
        this.titulares = titulares
    }

    processar(): void {
        let opcao = this.entrada.receberNumero('Qual o ID do cliente titular?');
        
        if (opcao < 1 || opcao > this.titulares.length) {
            console.log('ID do cliente titular inválido');
            return; // Exit the method to return to the initial menu
        }

        let titular = this.titulares[opcao - 1];

        if (titular.Dependentes.length === 0) {
            console.log('Não há dependentes para este cliente titular.');
            return; // Exit the method to return to the initial menu
        }

        console.clear()
        console.log('Iniciando a listagem dos dependentes...')
        const dependentes = titular.Dependentes;
        dependentes.forEach(cliente => {
            this.impressor = new ImpressaorCliente(cliente)
            console.log(this.impressor.imprimir())
        });
    }

    listarTodosDependentes(): Cliente[] {
        console.clear();
        console.log('Listando todos os dependentes de todos os titulares...');
        let count = 0;
        let dependentesList: Cliente[] = [];
    
        this.titulares.forEach((titular, index) => {
            if (titular.Dependentes.length > 0) {
                console.log(`Dependentes do titular ${titular.Nome}:`);
                titular.Dependentes.forEach((dependente) => {
                    count++;
                    console.log(`${count}. ${dependente.Nome}`);
                    dependentesList.push(dependente);
                });
            } else {
                console.log(`O titular ${titular.Nome} não possui dependentes.`);
            }
        });
    
        return dependentesList;
    }

    exibirTitularDeDependente(dependente: Cliente): void {
        console.clear();
        console.log('Exibindo informações do titular do dependente...');
    
        let titularEncontrado: Cliente | undefined;
    
        this.titulares.forEach(titular => {
            if (titular.Dependentes.includes(dependente)) {
                titularEncontrado = titular;
            }
        });
    
        if (titularEncontrado) {
            this.impressor = new ImpressaorCliente(titularEncontrado);
            console.log(this.impressor.imprimir());
        } else {
            console.log('Titular não encontrado para o dependente fornecido.');
        }
    }

    obterDependentes(): Cliente[] {
        let dependentes: Cliente[] = [];
        this.titulares.forEach(titular => {
            titular.Dependentes.forEach(dependente => {
                dependentes.push(dependente);
            });
        });
        return dependentes;
    }
}