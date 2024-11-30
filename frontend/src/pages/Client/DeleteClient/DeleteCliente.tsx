import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React, { useState } from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function DeleteClient() {
  const [clientType, setClientType] = useState("Titular");
  const [cpf, setCpf] = useState(""); // Para armazenar o CPF inserido
  const [dependentes, setDependentes] = useState([]); // Armazena os dependentes
  const [showModal, setShowModal] = useState(false); // Controla o estado do modal
  const [selectedDependente, setSelectedDependente] = useState(null); // Armazena o dependente selecionado

  // Função para realizar a requisição DELETE
  const handleDeleteClient = async () => {
    if (clientType === "Titular") {
      try {
        const response = await fetch("http://localhost:3333/deletar-cliente-titular", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf }), // Envia o CPF no corpo da requisição
        });

        if (response.ok) {
          alert("Cliente deletado com sucesso!");
        } else {
          alert("Erro ao deletar cliente.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao deletar cliente.");
      }
    }

    if (clientType === "Dependente") {
      try {
        const response = await fetch("http://localhost:3333/dependentes-do-titular", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf }), // Envia o CPF no corpo da requisição
        });

        if (response.ok) {
          // Após a requisição, obtém a lista de dependentes
          const dependentesData = await response.json();
          if (dependentesData.length === 0) {
            alert("O cliente titular não tem dependentes.");
          } else {
            setDependentes(dependentesData); // Armazena os dependentes no estado
            setShowModal(true); // Exibe o modal
          }
        } else {
          alert("Erro ao deletar cliente.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao deletar cliente.");
      }
    }
  };

  const handleDependenteClick = async (dependente) => {
    try {
      const response = await fetch("http://localhost:3333/deletar-dependente", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dependenteId: dependente.id }), // Envia o CPF do dependente no corpo da requisição
      });

      if (response.ok) {
        alert("Dependente deletado com sucesso!");
        setDependentes(dependentes.filter(d => d.id !== dependente.id)); // Remove o dependente deletado da lista
      } else {
        alert("Erro ao deletar dependente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao deletar dependente.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDependente(null); // Limpa o dependente selecionado ao fechar o modal
  };

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <div className="p-4 border-b text-center">
          <h2 className="text-3xl font-bold">Buscar Cliente para Deletar</h2>
        </div>
        <div className="p-4 space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              className={`px-6 py-2 rounded ${clientType === "Titular" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setClientType("Titular")}
            >
              Titular
            </button>
            <button
              className={`px-6 py-2 rounded ${clientType === "Dependente" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setClientType("Dependente")}
            >
              Dependente
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Digite o CPF do cliente"
              className="w-full border p-3 rounded"
              value={cpf} // Associa o valor do estado ao input
              onChange={(e) => setCpf(e.target.value)} // Atualiza o CPF conforme o usuário digita
            />
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={handleDeleteClient} className="bg-green-500 text-white px-6 py-3 rounded">
              Confirmar
            </button>
          </div>
        </div>
      </div>

      {/* Modal para exibir as informações dos dependentes */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-md">
            <h3 className="text-2xl font-bold mb-4">Dependentes</h3>
            <ul>
              {dependentes.map((dependente) => (
                <li
                  key={dependente.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleDependenteClick(dependente)}
                >
                  {dependente.nome}
                </li>
              ))}
            </ul>
            {selectedDependente && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold">Detalhes do Dependente</h4>
                <p><strong>Nome:</strong> {selectedDependente.nome}</p>
                <p><strong>CPF:</strong> {selectedDependente.cpf}</p>
                <p><strong>Data de Nascimento:</strong> {selectedDependente.dataNascimento}</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}