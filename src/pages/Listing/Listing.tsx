import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React from "react";
import backgroundImage from "../../assets/images/background.jpg";
import { useNavigate } from "react-router-dom";

export default function Listing() {
  const navigate = useNavigate();

  const handleAllTitularClick = () => {
    navigate("/listing/alltitular");
  }

  const handleTitularDependenteClick = () => {
    navigate("/listing/dependenteTitular");
  }

  const handleDependeteTitularClick = () => {
    navigate("/listing/titularDependente");
  }

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-md bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-center">Listagem</h2>
        </div>
        <div className="p-4 space-y-4">
          <button 
            className="w-full flex justify-start items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={handleAllTitularClick}
          >
            <UserPlus className="h-5 w-5" />
            <span>Todos os titulares</span>
          </button>
          <button 
            className="w-full flex justify-start items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={handleDependeteTitularClick}  
          >
            <UserCog className="h-5 w-5" />
            <span>Todos os dependentes de um titular específico</span>
          </button>
          <button 
            className="w-full flex justify-start items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={handleTitularDependenteClick}  
          >
            <UserMinus className="h-5 w-5" />
            <span>Titular de um dependente específico</span>
          </button>
        </div>
      </div>
    </div>
  );
}