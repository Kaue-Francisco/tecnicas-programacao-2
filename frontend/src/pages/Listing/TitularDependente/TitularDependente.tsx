import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function TitularDependente() {
  const [dependentes, setDependentes] = useState([]); // Lista de dependentes
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [modalData, setModalData] = useState(null); // Dados para exibir no modal
  const [showModal, setShowModal] = useState(false); // Controle do modal

  // Função para buscar todos os dependentes
  const fetchDependentes = async () => {
    try {
      const response = await fetch("http://localhost:3333/todos-dependentes");
      if (response.ok) {
        const data = await response.json();
        setDependentes(data);
      } else {
        alert("Erro ao buscar os dependentes.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao buscar os dependentes.");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar o titular e exibir o modal
  const handleDependenteClick = async (titularId) => {
    try {
      const response = await fetch("http://localhost:3333/buscar-titular-dependente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titularId }),
      });

      if (response.ok) {
        const data = await response.json();
        setModalData(data);
        setShowModal(true); // Exibe o modal
      } else {
        alert("Erro ao buscar o titular do dependente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao buscar o titular do dependente.");
    }
  };

  // Carrega os dependentes ao montar o componente
  useEffect(() => {
    fetchDependentes();
  }, []);

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-4xl bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-center">
            {loading ? "Carregando..." : "Lista de Usuários Dependentes"}
          </h2>
        </div>
        <div className="p-4 overflow-x-auto">
          {loading ? (
            <p className="text-center">Carregando dependentes...</p>
          ) : dependentes.length === 0 ? (
            <p className="text-center text-red-500">Não há clientes dependentes.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Data de Nascimento</th>
                  <th className="py-2 px-4 border-b">Titular ID</th>
                </tr>
              </thead>
              <tbody>
                {dependentes.map((dependente) => (
                  <tr
                    key={dependente.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleDependenteClick(dependente.titularId)} // Chama a função com titularId
                  >
                    <td className="py-2 px-4 border-b text-center">{dependente.nome}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(dependente.dataNasc).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{dependente.titularId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)} // Fecha o modal
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Detalhes do Titular</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Informações Pessoais</h4>
                <p>Nome: {modalData[0].nome}</p>
                <p>Nome Social: {modalData[0].nomeSocial}</p>
                <p>Data de Nascimento: {new Date(modalData[0].dataNasc).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold">Endereço</h4>
                <p>Rua: {modalData[2].rua}</p>
                <p>Bairro: {modalData[2].bairro}</p>
                <p>Cidade: {modalData[2].cidade}</p>
                <p>Estado: {modalData[2].estado}</p>
                <p>País: {modalData[2].pais}</p>
                <p>CEP: {modalData[2].cep}</p>
              </div>
              <div>
                <h4 className="font-semibold">Documento</h4>
                <p>Tipo: {modalData[1].tipo}</p>
                <p>Número: {modalData[1].numero}</p>
                <p>Data de Emissão: {new Date(modalData[1].dataEmissao).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold">Contato</h4>
                <p>Telefone: ({modalData[3].ddd}) {modalData[3].numero}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
