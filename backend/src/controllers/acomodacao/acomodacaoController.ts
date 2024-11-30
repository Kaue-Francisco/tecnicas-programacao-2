import { Request, Response } from "express";
import { ClienteService } from "../../services/cliente/clienteService";
import AcomodacaoSerice from "../../services/acomodacao/acomodacaoService";

const clienteService = new ClienteService();
const acomodacaoService = new AcomodacaoSerice();

export default class AcomodacaoController {

  public async realizarHospedagem(request: Request, response: Response) {
    const { cpf, acomodacao } = request.body;
    let cliente = await clienteService.buscarClientePorCpf(cpf);

    try {
      await acomodacaoService.cadastroAcomodacao(Number(cliente?.id), acomodacao);
      return response.status(201).json({ message: "Acomodação realizada com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao realizar acomodação." });
    }
  }

}