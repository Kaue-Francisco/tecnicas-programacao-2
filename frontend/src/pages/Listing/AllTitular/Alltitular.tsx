import React, { useEffect, useState } from "react";
import backgroundImage from "../../../assets/images/background.jpg";

export default function AllTitular() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); // Detalhes completos do usuário
  const [modalOpen, setModalOpen] = useState(false); // Controle do modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3333/clientes-titulares");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        const mappedUsers = data.map((user) => ({
          id: user.id,
          name: user.nome,
          socialName: user.nomeSocial,
          birthDate: new Date(user.dataNasc).toLocaleDateString("pt-BR"),
          addressId: user.enderecoId || "Não disponível",
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch("http://localhost:3333/buscar-titular-dependente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titularId: userId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do cliente");
      }

      const data = await response.json();

      // Organizando os dados retornados
      const user = data.find((item) => item.nome); // Informações pessoais
      const document = data.find((item) => item.tipo); // Documento
      const address = data.find((item) => item.rua); // Endereço
      const phone = data.find((item) => item.ddd); // Telefone

      setSelectedUserDetails({
        personalInfo: user || {},
        document: document || {},
        address: address || {},
        phone: phone || {},
      });

      setModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes do cliente:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <p className="text-lg font-semibold">Carregando...</p>
      </div>
    );
  }

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
                <th className="py-2 px-4 border-b">Nome Social</th>
                <th className="py-2 px-4 border-b">Data de Nascimento</th>
                <th className="py-2 px-4 border-b">Endereço ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => fetchUserDetails(user.id)}
                >
                  <td className="py-2 px-4 border-b text-center">{user.name}</td>
                  <td className="py-2 px-4 border-b text-center">{user.socialName}</td>
                  <td className="py-2 px-4 border-b text-center">{user.birthDate}</td>
                  <td className="py-2 px-4 border-b text-center">{user.addressId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && selectedUserDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h3 className="text-xl font-bold mb-4">Detalhes do Cliente</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Informações Pessoais</h4>
                <p>Nome: {selectedUserDetails.personalInfo.nome}</p>
                <p>Nome Social: {selectedUserDetails.personalInfo.nomeSocial}</p>
                <p>Data de Nascimento: {new Date(selectedUserDetails.personalInfo.dataNasc).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold">Endereço</h4>
                <p>Rua: {selectedUserDetails.address.rua}</p>
                <p>Bairro: {selectedUserDetails.address.bairro}</p>
                <p>Cidade: {selectedUserDetails.address.cidade}</p>
                <p>Estado: {selectedUserDetails.address.estado}</p>
                <p>País: {selectedUserDetails.address.pais}</p>
                <p>CEP: {selectedUserDetails.address.cep}</p>
              </div>
              <div>
                <h4 className="font-semibold">Documento</h4>
                <p>Tipo: {selectedUserDetails.document.tipo}</p>
                <p>Número: {selectedUserDetails.document.numero}</p>
                <p>Data de Emissão: {new Date(selectedUserDetails.document.dataEmissao).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="font-semibold">Contato</h4>
                <p>Telefone: ({selectedUserDetails.phone.ddd}) {selectedUserDetails.phone.numero}</p>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}