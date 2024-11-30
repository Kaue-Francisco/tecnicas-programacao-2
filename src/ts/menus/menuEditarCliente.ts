import Menu from "../interfaces/menu";

export default class MenuTipoEditarClientes implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo você deseja editar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Titulares`)
        console.log(`| 2 - Dependentes`)
        console.log(`----------------------`)
    }
}