DROP DATABASE magicspot;
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
CONSTRAINT pkTentativaEscolha PRIMARY KEY (idTentativa, fkUsuario),
CONSTRAINT fkTentativaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE escolha (
idEscolha INT,
fkTentativa INT,
fkUsuario INT,
fkNumero INT,
dtEscolha DATE,
CONSTRAINT pkEscolha PRIMARY KEY (idEscolha, fkTentativa, fkUsuario, fkNumero),
CONSTRAINT fkTentativaEscolha FOREIGN KEY (fkTentativa) REFERENCES tentativa(idTentativa),
CONSTRAINT fkUsuarioEscolha FOREIGN KEY (fkUsuario) REFERENCES tentativa(fkUsuario),
CONSTRAINT fkNumeroEscolha FOREIGN KEY (fkNumero) REFERENCES numero(idNumero)
);

INSERT INTO usuario (nome, email, senha) VALUES
	('Matheus', 'matheus@gmail.com', '123');


SELECT * FROM usuario;
SELECT * FROM tentativa;
SELECT * FROM numero;
SELECT * FROM escolha;

SELECT count(fkTentativa) AS qtdTentativas, dtEscolha FROM escolha WHERE fkUsuario = 1 GROUP BY dtEscolha ORDER BY dtEscolha DESC LIMIT 7;

SELECT max(idTentativa) AS ultimaTentativa FROM tentativa WHERE fkUsuario = 1;