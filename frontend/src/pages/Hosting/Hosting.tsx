import { UserPlus, UserCog, UserMinus } from "lucide-react";
import React from "react";
import backgroundImage from "../../assets/images/background.jpg";
import { useNavigate } from "react-router-dom";

export default function Hosting() {
  const navigate = useNavigate()

  const handleListHotelClick = () => {
    navigate("/hosting/list")
  }

  const handleHospedagemClick = () => {
    navigate("/hosting/hospedagem")
  }

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center bg-gray-100 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative w-full max-w-md bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-center">Hospedagem</h2>
        </div>
        <div className="p-4 space-y-4">
          <button 
            className="w-full flex justify-start items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={handleListHotelClick}  
          >
            <UserPlus className="h-5 w-5" />
            <span>Visualizar hospedagens</span>
          </button>
          <button 
            className="w-full flex justify-start items-center space-x-2 border border-gray-300 rounded-md p-2 hover:bg-gray-50"
            onClick={handleHospedagemClick}
          >
            <UserCog className="h-5 w-5" />
            <span>Realizar uma hospedagem</span>
          </button>
        </div>
      </div>
    </div>
  );
}