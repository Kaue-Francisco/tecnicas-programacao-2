import Prototipo from "../interfaces/prototipo";

export default class Telefone implements Prototipo {
    public ddd: string;
    public numero: string;

    public clonar(): Prototipo {
        let telefoneClonado = new Telefone();
        telefoneClonado.ddd = this.ddd;
        telefoneClonado.numero = this.numero;
        return telefoneClonado;
    }
}