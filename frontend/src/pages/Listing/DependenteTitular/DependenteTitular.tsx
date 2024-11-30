import React, { useState } from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function DependenteTitular() {
  const [cpf, setCpf] = useState(""); // Para armazenar o CPF inserido
  const [dependentes, setDependentes] = useState([]); // Para armazenar os dados retornados
  const [showSearch, setShowSearch] = useState(true); // Controla a exibição dos campos de busca

  // Função para realizar a requisição POST
  const handleGetDependentes = async () => {
    try {
      const requestBody = { cpf };
      const response = await fetch(`http://localhost:3333/dependentes-do-titular`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setDependentes(data); // Atualiza os dados na tabela
          setShowSearch(false); // Oculta os campos de busca
        } else {
          alert("O cliente titular não tem dependentes.");
        }
      } else {
        alert("Erro ao buscar dependentes.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao buscar dependentes.");
    }
  };

  // Função para voltar à tela de busca
  const handleResetSearch = () => {
    setCpf("");
    setDependentes([]);
    setShowSearch(true); // Exibe os campos de busca novamente
  };

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <div className="p-4 border-b text-center">
          <h2 className="text-3xl font-bold">
            {showSearch ? "Buscar Clientes Dependentes" : "Dependentes"}
          </h2>
        </div>
        <div className="p-4 space-y-6">
          {showSearch ? (
            <>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Digite um documento do cliente titular"
                  className="w-full border p-3 rounded"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleGetDependentes}
                  className="bg-green-500 text-white px-6 py-3 rounded"
                >
                  Buscar
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Renderiza a tabela com os dados */}
              {dependentes.length > 0 && (
                <div className="mt-6">
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Nome</th>
                        <th className="border border-gray-300 px-4 py-2">Nome Social</th>
                        <th className="border border-gray-300 px-4 py-2">
                          Data de Nasc.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dependentes.map((dependente) => (
                        <tr key={dependente.id}>
                          <td className="border border-gray-300 px-4 py-2">
                            {dependente.nome}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {dependente.nomeSocial}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(dependente.dataNasc).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Botão para buscar novamente */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleResetSearch}
                  className="bg-blue-500 text-white px-6 py-3 rounded"
                >
                  Buscar Novamente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
