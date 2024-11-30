import Menu from "../interfaces/menu";

export default class MenuTipoTelefone implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Quantos telefones você deseja cadastrar? `)
        console.log(`----------------------`)
    }
}