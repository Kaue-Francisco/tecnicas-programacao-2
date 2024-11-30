import React from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function ListHotel() {
  const rooms = [
    { name: "Casal Simples", singleBed: 0, doubleBed: 1, suite: 1, airConditioning: "Sim", garage: 1 },
    { name: "Família Simples", singleBed: 2, doubleBed: 1, suite: 1, airConditioning: "Sim", garage: 1 },
    { name: "Família Mais", singleBed: 5, doubleBed: 1, suite: 2, airConditioning: "Sim", garage: 2 },
    { name: "Família Super", singleBed: 6, doubleBed: 2, suite: 3, airConditioning: "Sim", garage: 2 },
    { name: "Solteiro Simples", singleBed: 1, doubleBed: 0, suite: 1, airConditioning: "Sim", garage: 0 },
    { name: "Solteiro Mais", singleBed: 0, doubleBed: 1, suite: 1, airConditioning: "Sim", garage: 1 },
  ];

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-5xl bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-center">Lista de Quartos</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nome</th>
                <th className="py-2 px-4 border-b">Cama Solteiro</th>
                <th className="py-2 px-4 border-b">Cama Casal</th>
                <th className="py-2 px-4 border-b">Suíte</th>
                <th className="py-2 px-4 border-b">Climatização</th>
                <th className="py-2 px-4 border-b">Garagem</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{room.name}</td>
                  <td className="py-2 px-4 border-b text-center">{room.singleBed}</td>
                  <td className="py-2 px-4 border-b text-center">{room.doubleBed}</td>
                  <td className="py-2 px-4 border-b text-center">{room.suite}</td>
                  <td className="py-2 px-4 border-b text-center">{room.airConditioning}</td>
                  <td className="py-2 px-4 border-b text-center">{room.garage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
