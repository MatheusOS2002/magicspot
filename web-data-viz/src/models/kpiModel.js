var database = require("../database/config");

function tentativasHoje(idUsuario) {
    var instrucaoSql = `SELECT count(idEscolha) AS hoje FROM escolha
    WHERE dtEscolha = CURDATE() AND fkUsuario = ${idUsuario};`;

    return database.executar(instrucaoSql);
}

function tentativasSemana(idUsuario) {
    var instrucaoSql = `SELECT count(idEscolha) AS semana FROM escolha
    WHERE fkUsuario = ${idUsuario} AND DATEDIFF(CURRENT_DATE, dtEscolha) <= 7;`;

    return database.executar(instrucaoSql);
}

module.exports = {
    tentativasHoje,
    tentativasSemana
}