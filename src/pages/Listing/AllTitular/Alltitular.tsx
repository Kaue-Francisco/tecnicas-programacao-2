import React from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function AllTitular() {
  const users = [
    { name: "João Silva", birthDate: "12/05/1990", cpf: "123.456.789-10", type: "Titular" },
    { name: "Maria Santos", birthDate: "20/07/1985", cpf: "234.567.890-12", type: "Titular" },
    { name: "Pedro Oliveira", birthDate: "15/01/2000", cpf: "345.678.901-23", type: "Titular" },
    { name: "Ana Lima", birthDate: "10/03/1993", cpf: "456.789.012-34", type: "Titular" },
  ];

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-4xl bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-center">Lista de Usuários Titulares</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nome</th>
                <th className="py-2 px-4 border-b">Data de Nascimento</th>
                <th className="py-2 px-4 border-b">CPF</th>
                <th className="py-2 px-4 border-b">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{user.name}</td>
                  <td className="py-2 px-4 border-b text-center">{user.birthDate}</td>
                  <td className="py-2 px-4 border-b text-center">{user.cpf}</td>
                  <td className="py-2 px-4 border-b text-center">{user.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
