import { useState } from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function EditClient() {
  const [clientType, setClientType] = useState("Titular");
  const [cpf, setCpf] = useState("");
  const [clientData, setClientData] = useState(null);
  const [dependents, setDependents] = useState([]);
  const [selectedDependent, setSelectedDependent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDateForInput = (isoDate) => {
    return isoDate ? isoDate.split("T")[0] : "";
  };

  const formatDateForAPI = (date) => {
    return new Date(date).toISOString();
  };

  const handleSearchClient = async () => {
    if (!cpf) {
      alert("Por favor, insira o CPF.");
      return;
    }
    try {
      const endpoint =
        clientType === "Titular" ? "buscar-titular" : "dependentes-do-titular";
      const response = await fetch(`http://localhost:3333/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf }),
      });
      const data = await response.json();
      if (response.ok) {
        if (clientType === "Titular") {
          setClientData({
            ...data,
            dataNasc: formatDateForInput(data.dataNasc),
          });
          setIsModalOpen(true);
        } else {
          if (data.length === 0) {
            alert("Este titular não tem dependentes.");
          } else {
            setDependents(data);
            setIsModalOpen(true);
          }
        }
      } else {
        alert(data.message || "Erro ao buscar cliente.");
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleEditClient = async () => {
    try {
      const updatedData =
        clientType === "Titular"
          ? {
              ...clientData,
              dataNasc: formatDateForAPI(clientData.dataNasc),
            }
          : {
              ...selectedDependent,
              dataNasc: formatDateForAPI(selectedDependent.dataNasc),
            };

      const endpoint =
        clientType === "Titular" ? "editar-titular" : "editar-dependente";
      const response = await fetch(`http://localhost:3333/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        alert("Cliente atualizado com sucesso!");
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao atualizar cliente.");
      }
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <div className="p-4 border-b text-center">
          <h2 className="text-3xl font-bold">Buscar Cliente para Editar</h2>
        </div>
        <div className="p-4 space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              className={`px-6 py-2 rounded ${
                clientType === "Titular"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setClientType("Titular")}
            >
              Titular
            </button>
            <button
              className={`px-6 py-2 rounded ${
                clientType === "Dependente"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setClientType("Dependente")}
            >
              Dependente
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Digite o CPF do cliente"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded"
              onClick={handleSearchClient}
            >
              Buscar Cliente
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {clientType === "Titular" ? (
              <>
                <h3 className="text-xl font-bold mb-4">Editar Cliente</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Nome</label>
                    <input
                      type="text"
                      value={clientData?.nome || ""}
                      onChange={(e) =>
                        setClientData({ ...clientData, nome: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Nome Social
                    </label>
                    <input
                      type="text"
                      value={clientData?.nomeSocial || ""}
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          nomeSocial: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={clientData?.dataNasc || ""}
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          dataNasc: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {selectedDependent ? (
                  <>
                    <h3 className="text-xl font-bold mb-4">
                      Editar Dependente
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Nome</label>
                        <input
                          type="text"
                          value={selectedDependent.nome || ""}
                          onChange={(e) =>
                            setSelectedDependent({
                              ...selectedDependent,
                              nome: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Nome Social
                        </label>
                        <input
                          type="text"
                          value={selectedDependent.nomeSocial || ""}
                          onChange={(e) =>
                            setSelectedDependent({
                              ...selectedDependent,
                              nomeSocial: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Data de Nascimento
                        </label>
                        <input
                          type="date"
                          value={
                            formatDateForInput(selectedDependent.dataNasc) || ""
                          }
                          onChange={(e) =>
                            setSelectedDependent({
                              ...selectedDependent,
                              dataNasc: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-4">
                      Selecionar Dependente
                    </h3>
                    <div className="space-y-4">
                      {dependents.map((dependent) => (
                        <button
                          key={dependent.id}
                          className={`w-full border p-2 rounded text-left ${
                            selectedDependent?.id === dependent.id
                              ? "bg-blue-200"
                              : ""
                          }`}
                          onClick={() => setSelectedDependent(dependent)}
                        >
                          {dependent.nome}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              {(clientType === "Titular" || selectedDependent) && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleEditClient}
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
