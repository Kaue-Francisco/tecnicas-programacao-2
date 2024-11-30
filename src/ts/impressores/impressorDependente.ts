import Impressor from "../interfaces/impressor"
import Cliente from "../modelos/cliente"
import Documento from "../modelos/documento"
import ImpressorDocumento from "./impressorDocumento"

export default class ImpressorDependente implements Impressor {
    private dependente: Cliente
    private impressor!: Impressor

    constructor(dependente: Cliente) {
        this.dependente = dependente
    }

    imprimir(): string {
        let impressao = ``;
        const dependentes = this.dependente.Dependentes;

        if (dependentes.length === 0) {
            return '';
        }

        for (let index = 0; index < dependentes.length; index++) {
            const dependente = dependentes[index];
            impressao += `| Dependente ${index + 1} - Nome: ${dependente.Nome}`;

            // Separador entre dependentes
            if (index < dependentes.length - 1) {
                impressao += `\n`; // Nova linha entre dependentes
            }
        }

        return impressao;
    }
}
