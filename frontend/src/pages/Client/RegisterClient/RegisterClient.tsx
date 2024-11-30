import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React, { useState } from "react";

import backgroundImage from "../../../assets/images/background.jpg";

export default function RegisterClient() {
  const [clientType, setClientType] = useState("Titular");
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [endereco, setEndereco] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "",
    cep: "",
  });
  const [phones, setPhones] = useState([{ ddd: "", numero: "" }]);
  const [cpfTitular, setCpfTitular] = useState("");
  const [documents, setDocuments] = useState([
    { tipo: "Passaporte", numero: "", dataEmissao: "" },
  ]);

  const handleAddPhone = () => setPhones([...phones, { ddd: "", numero: "" }]);
  const handleRemovePhone = (index) =>
    setPhones(phones.filter((_, i) => i !== index));
  const handlePhoneChange = (index, field, value) => {
    const newPhones = [...phones];
    newPhones[index] = { ...newPhones[index], [field]: value };
    setPhones(newPhones);
  };

  const handleAddDocument = () =>
    setDocuments([...documents, { tipo: "Passaporte", numero: "", dataEmissao: "" }]);
  const handleRemoveDocument = (index) =>
    setDocuments(documents.filter((_, i) => i !== index));
  const handleDocumentChange = (index, field, value) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    const formattedDataNasc = new Date(dataNasc).toISOString();

    // Enviar payload para cadastro do titular
    if (clientType === "Titular") {
      const formattedDocuments = documents.map((doc) => ({
        ...doc,
        dataEmissao: new Date(doc.dataEmissao).toISOString(),
      }));
    
      const payload = {
        nome,
        nomeSocial,
        dataNasc: formattedDataNasc,
        endereco,
        telefone: phones,
        documentos: formattedDocuments,
      };

      try {
        const response = await fetch("http://localhost:3333/cadastro-cliente-titular", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error("Erro ao cadastrar cliente");
        }
  
        const data = await response.json();
        console.log("Cliente cadastrado com sucesso:", data);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    // Enviar payload para cadastro do dependente
    if (clientType === "Dependente") {
      const dependentePayload = {
        nome,
        nomeSocial,
        dataNasc: formattedDataNasc,
        cpf: cpfTitular,
      };

      try {
        const response = await fetch("http://localhost:3333/cadastro-cliente-dependente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dependentePayload),
        });
  
        if (!response.ok) {
          throw new Error("Erro ao cadastrar dependente");
        }
  
        const data = await response.json();
        console.log("Dependente cadastrado com sucesso:", data);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-2xl bg-white shadow-md rounded-lg mt-8 mb-8 p-8">
        <div className="p-4 border-b">
          <h2 className="text-3xl font-bold text-center">Cadastrar Cliente</h2>
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
          {clientType === "Titular" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                className="w-full border p-3 rounded"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nome Social"
                className="w-full border p-3 rounded"
                value={nomeSocial}
                onChange={(e) => setNomeSocial(e.target.value)}
              />
              <input
                type="date"
                placeholder="Data de Nascimento"
                className="w-full border p-3 rounded"
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
              />
              <input
                type="text"
                placeholder="Rua"
                className="w-full border p-3 rounded"
                value={endereco.rua}
                onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
              />
              <input
                type="text"
                placeholder="Bairro"
                className="w-full border p-3 rounded"
                value={endereco.bairro}
                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cidade"
                className="w-full border p-3 rounded"
                value={endereco.cidade}
                onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
              />
              <input
                type="text"
                placeholder="Estado"
                className="w-full border p-3 rounded"
                value={endereco.estado}
                onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
              />
              <input
                type="text"
                placeholder="País"
                className="w-full border p-3 rounded"
                value={endereco.pais}
                onChange={(e) => setEndereco({ ...endereco, pais: e.target.value })}
              />
              <input
                type="text"
                placeholder="CEP"
                className="w-full border p-3 rounded"
                value={endereco.cep}
                onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
              />

              <div>
                <h3 className="font-bold">Telefones</h3>
                {phones.map((phone, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={phone.ddd}
                      placeholder="DDD"
                      onChange={(e) => handlePhoneChange(index, "ddd", e.target.value)}
                      className="w-16 border p-3 rounded"
                    />
                    <input
                      type="text"
                      value={phone.numero}
                      placeholder="Número"
                      onChange={(e) => handlePhoneChange(index, "numero", e.target.value)}
                      className="w-full border p-3 rounded"
                    />
                    <button
                      onClick={() => handleRemovePhone(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remover
                    </button>
                  </div>
                ))}
                <button onClick={handleAddPhone} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Adicionar Telefone
                </button>
              </div>

              <div>
                <h3 className="font-bold">Documentos</h3>
                {documents.map((document, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <select
                      value={document.tipo}
                      onChange={(e) => handleDocumentChange(index, "tipo", e.target.value)}
                      className="border p-3 rounded w-full"
                    >
                      <option value="Passaporte">Passaporte</option>
                      <option value="CPF">CPF</option>
                      <option value="RG">RG</option>
                    </select>
                    <input
                      type="text"
                      value={document.numero}
                      onChange={(e) => handleDocumentChange(index, "numero", e.target.value)}
                      placeholder="Número"
                      className="border p-3 rounded w-full"
                    />
                    <input
                      type="date"
                      value={document.dataEmissao}
                      onChange={(e) => handleDocumentChange(index, "dataEmissao", e.target.value)}
                      placeholder="Data de Expedição"
                      className="border p-3 rounded w-full"
                    />
                    <button
                      onClick={() => handleRemoveDocument(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remover
                    </button>
                  </div>
                ))}
                <button onClick={handleAddDocument} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Adicionar Documento
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-3 rounded">
                  Cadastrar
                </button>
              </div>
            </div>
          )}
          {clientType === "Dependente" && (
            <div className="space-y-4">
              {/* Campos de Dependente */}
              <input
                type="text"
                placeholder="CPF do Titular"
                className="w-full border p-3 rounded"
                value={cpfTitular}
                onChange={(e) => setCpfTitular(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nome"
                className="w-full border p-3 rounded"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nome Social"
                className="w-full border p-3 rounded"
                value={nomeSocial}
                onChange={(e) => setNomeSocial(e.target.value)}
              />
              <input
                type="date"
                placeholder="Data de Nascimento"
                className="w-full border p-3 rounded"
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
              />
              <div className="flex justify-center mt-6">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-3 rounded">
                  Cadastrar
                </button>
              </div>
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
}