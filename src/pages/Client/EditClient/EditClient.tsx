import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React, { useState } from "react";

import backgroundImage from "../../../assets/images/background.jpg";

export default function EditClient() {
  const [clientType, setClientType] = useState("Titular");

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
            {clientType === "Titular" && (
              <input
                type="number"
                placeholder="Digite o CPF do cliente"
                className="w-full border p-3 rounded"
              />
            )}
            {clientType === "Dependente" && (
              <input
                type="number"
                placeholder="Digite o CPF do cliente"
                className="w-full border p-3 rounded"
              />
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-green-500 text-white px-6 py-3 rounded">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}