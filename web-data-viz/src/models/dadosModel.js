var database = require("../database/config");

function buscarUltimosDados(idUsuario, limite_linhas) {

    var instrucaoSql = `SELECT count(idEscolha) AS qtdTentativas, DATE_FORMAT(dtEscolha, '%d/%m/%Y') AS dtEscolha FROM escolha
                        WHERE fkUsuario = ${idUsuario} GROUP BY dtEscolha ORDER BY dtEscolha DESC LIMIT ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirParcelas(parcela) {
    var instrucaoSql = `INSERT INTO numero (numero) VALUES (${parcela});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarUltimaTentativa(idUsuario) {

    console.log(`\nidUsuario: ${idUsuario}\n`)

    var instrucaoSql = `SELECT max(idTentativa) AS ultimaTentativa FROM tentativa WHERE fkUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirTentativa(idTentativa, idUsuario, qtdNumero, qtdAlgarismos, resultadoFinal) {
    var instrucaoSql = `INSERT INTO tentativa (idTentativa, fkUsuario, qtdNumero, qtdAlgarismo, resultado) VALUES (${idTentativa}, ${idUsuario}, ${qtdNumero}, ${qtdAlgarismos}, ${resultadoFinal});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarUltimaEscolha(idUsuario) {
    var instrucaoSql = `SELECT max(idEscolha) AS ultimaEscolha FROM escolha WHERE fkUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarNumeroInserido() {
    var instrucaoSql = `SELECT max(idNumero) AS ultimoNumero FROM numero;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirEscolha(idEscolha, idUsuario, idTentativa, idNumero) {
    var instrucaoSql = `INSERT INTO escolha (idEscolha, fkTentativa, fkUsuario, fkNumero, dtEscolha) VALUES (${idEscolha}, ${idTentativa}, ${idUsuario}, ${idNumero}, CURDATE());`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosDados,
    inserirParcelas,
    verificarUltimaTentativa,
    inserirTentativa,
    verificarUltimaEscolha,
    verificarNumeroInserido,
    inserirEscolha
}
