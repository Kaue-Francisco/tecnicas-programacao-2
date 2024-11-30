// Modelo Telefone
import Prototipo from "../interfaces/prototipo";

export default class Telefone implements Prototipo {
    public ddd: string;
    public numero: string;

    constructor(ddd: string, numero: string) {
        this.ddd = ddd;
        this.numero = numero;
    }

    public clonar(): Prototipo {
        let telefoneClonado = new Telefone(this.ddd, this.numero);
        return telefoneClonado;
    }

    public get Ddd() { return this.ddd }
    public get Numero() { return this.numero }
}