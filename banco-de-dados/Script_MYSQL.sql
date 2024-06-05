CREATE DATABASE magicspot;
USE magicspot;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(200),
senha VARCHAR(20)
);

CREATE TABLE numero (
idNumero INT PRIMARY KEY AUTO_INCREMENT,
numero INT
);

CREATE TABLE tentativa (
idTentativa INT,
fkUsuario INT,
qtdNumero INT,
qtdAlgarismo INT,
resultado INT,
dtTentativa DATETIME,
CONSTRAINT pkTentativaEscolha PRIMARY KEY (idTentativa, fkUsuario),
CONSTRAINT fkTentativaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE escolha (
idEscolha INT,
fkTentativa INT,
fkUsuario INT,
fkNumero INT,
CONSTRAINT pkEscolha PRIMARY KEY (idEscolha, fkTentativa, fkUsuario, fkNumero),
CONSTRAINT fkTentativaEscolha FOREIGN KEY (fkTentativa) REFERENCES tentativa(idTentativa),
CONSTRAINT fkUsuarioEscolha FOREIGN KEY (fkUsuario) REFERENCES tentativa(fkUsuario),
CONSTRAINT fkNumeroEscolha FOREIGN KEY (fkNumero) REFERENCES numero(idNumero)
);