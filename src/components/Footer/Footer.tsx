import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

// Componentes Button e Input básicos
const Button = ({
  children,
  type = "button",
  variant = "primary",
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}) => {
  const baseClasses = "px-4 py-2 rounded focus:outline-none focus:ring";
  const variantClasses =
    variant === "secondary"
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-blue-600 text-white hover:bg-blue-500";
  return (
    <button type={type} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
};

const Input = ({
  type = "text",
  placeholder,
  className = "",
}: {
  type?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring ${className}`}
    />
  );
};

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre nós</h3>
            <p className="mb-4 text-gray-100">
              Nós somos uma empresa que realiza a gestão de hotéis no fundo do
              mar! Estamos aqui para melhorar a gestão do seu negócio!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-100">
              Avenida Cesare Monsueto Giulio Lattes, 1350
            </p>
            <p className="text-gray-100">
              Distrito - Eugênio de Melo, São José dos Campos - SP
            </p>
            <p className="text-gray-100">Telefone: (12) 3905-4699</p>
            <p className="text-gray-100">Email: f146.secretaria@fatec.sp.gov.br</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Precisa de Ajuda?</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact Form
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Entre em contato</h3>
            <p className="mb-4">Preencha o campo abaixo para nos contatar:</p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Digite seu email"
                className="bg-gray-800 text-white"
              />
              <Button type="submit" variant="secondary">
                Enviar
              </Button>
            </form>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Atlantis. Todos os direitos reservados.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-gray-300">
              Termos de Serviço
            </a>
            {" | "}
            <a href="#" className="hover:text-gray-300">
              Politica de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}