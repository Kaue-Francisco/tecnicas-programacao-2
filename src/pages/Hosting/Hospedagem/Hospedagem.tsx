import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React, { useState } from "react";

import backgroundImage from "../../../assets/images/background.jpg";

export default function Hospedagem() {
  const [clientType, setClientType] = useState("Titular");
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-2xl bg-white shadow-md rounded-lg mt-8 mb-8 p-8">
        <div className="p-4 space-y-6">
          <div className="p-4 mt-8">
            <h2 className="text-2xl font-bold text-center">Realizar Hospedagem</h2>
            <div className="space-y-4 mt-4">
              <input
                type="number"
                placeholder="CPF do Cliente"
                className="w-full border p-3 rounded"
              />
              <select
                value={selectedAccommodation}
                onChange={(e) => setSelectedAccommodation(e.target.value)}
                className="w-full border p-3 rounded"
              >
                <option value="">Selecione a Hospedagem</option>
                <option value="Quarto Simples">Quarto Simples</option>
                <option value="Quarto Duplo">Quarto Duplo</option>
                <option value="Suíte">Suíte</option>
                <option value="Suíte Luxo">Suíte Luxo</option>
              </select>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded w-full mt-4"
              >
                Realizar Hospedagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}