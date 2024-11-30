# tecnicas-programacao-2

# Script do Banco
CREATE TABLE Endereco (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rua VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado VARCHAR(255),
  pais VARCHAR(255),
  cep VARCHAR(255)
);

CREATE TABLE ClienteTitular (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  nomeSocial VARCHAR(255),
  dataNasc DATETIME,
  enderecoId INT,
  FOREIGN KEY (enderecoId) REFERENCES Endereco(id)
);

CREATE TABLE ClienteDependente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  nomeSocial VARCHAR(255),
  dataNasc DATETIME,
  titularId INT,
  FOREIGN KEY (titularId) REFERENCES ClienteTitular(id)
);

CREATE TABLE Telefone (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ddd VARCHAR(255),
  numero VARCHAR(255),
  clienteId INT,
  FOREIGN KEY (clienteId) REFERENCES ClienteTitular(id)
);

CREATE TABLE documento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(255),
  numero VARCHAR(255),
  dataEmissao DATETIME,
  clienteId INT,
  INDEX clienteId (clienteId),
  CONSTRAINT documento_ibfk_1 FOREIGN KEY (clienteId) REFERENCES clientetitular(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE Acomodacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(255),
  clienteId INT,
  FOREIGN KEY (clienteId) REFERENCES ClienteTitular(id)
);