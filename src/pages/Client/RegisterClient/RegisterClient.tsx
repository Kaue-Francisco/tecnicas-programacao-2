import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React, { useState } from "react";

import backgroundImage from "../../../assets/images/background.jpg";

export default function RegisterClient() {
  const [clientType, setClientType] = useState("Titular");
  const [phones, setPhones] = useState([""]);
  const [documents, setDocuments] = useState([{ type: "Passaporte", number: "", expeditionDate: "" }]);

  const handleAddPhone = () => setPhones([...phones, ""]);
  const handleRemovePhone = (index) => setPhones(phones.filter((_, i) => i !== index));
  const handlePhoneChange = (index, value) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const handleAddDocument = () => setDocuments([...documents, { type: "Passaporte", number: "", expeditionDate: "" }]);
  const handleRemoveDocument = (index) => setDocuments(documents.filter((_, i) => i !== index));
  const handleDocumentChange = (index, field, value) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
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
              <input type="text" placeholder="Nome" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Nome Social" className="w-full border p-3 rounded" />
              <input type="date" placeholder="Data de Nascimento" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Rua" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Bairro" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Cidade" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Estado" className="w-full border p-3 rounded" />
              <input type="text" placeholder="País" className="w-full border p-3 rounded" />
              <input type="number" placeholder="Codigo Postal" className="w-full border p-3 rounded" />

              <div>
                <h3 className="font-bold">Telefones</h3>
                {phones.map((phone, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      placeholder="Telefone"
                      className="w-full border p-3 rounded"
                    />
                    <button onClick={() => handleRemovePhone(index)} className="bg-red-500 text-white px-4 py-2 rounded">
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
                      value={document.type}
                      onChange={(e) => handleDocumentChange(index, "type", e.target.value)}
                      className="border p-3 rounded w-full"
                    >
                      <option value="Passaporte">Passaporte</option>
                      <option value="CPF">CPF</option>
                      <option value="RG">RG</option>
                    </select>
                    <input
                      type="number"
                      value={document.number}
                      onChange={(e) => handleDocumentChange(index, "number", e.target.value)}
                      placeholder="Número"
                      className="border p-3 rounded w-full"
                    />
                    <input
                      type="date"
                      value={document.expeditionDate}
                      onChange={(e) => handleDocumentChange(index, "expeditionDate", e.target.value)}
                      placeholder="Data de Expedição"
                      className="border p-3 rounded w-full"
                    />
                    <button onClick={() => handleRemoveDocument(index)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Remover
                    </button>
                  </div>
                ))}
                <button onClick={handleAddDocument} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Adicionar Documento
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <button className="bg-green-500 text-white px-6 py-3 rounded">
                  Cadastrar
                </button>
              </div>
            </div>
          )}
          {clientType === "Dependente" && (
            <div className="space-y-4">
              <input type="text" placeholder="CPF do Titular" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Nome" className="w-full border p-3 rounded" />
              <input type="text" placeholder="Nome Social" className="w-full border p-3 rounded" />
              <input type="date" placeholder="Data de Nascimento" className="w-full border p-3 rounded" />

              <div className="flex justify-center mt-6">
                <button className="bg-green-500 text-white px-6 py-3 rounded">
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
