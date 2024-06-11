var database = require("../database/config");

function tentativasHoje(idUsuario) {
    var instrucaoSql = `SELECT count(idEscolha) FROM escolha
    WHERE dtEscolha = CURDATE() AND fkUsuario = ${idUsuario};`;

    return database.executar(instrucaoSql);
}

function tentativasSemana(idUsuario) {
    var instrucaoSql = `SELECT count(idEscolha), dtEscolha FROM escolha
    WHERE fkUsuario = ${idUsuario} GROUP BY dtEscolha ORDER BY dtEscolha DESC LIMIT 7;`;

    return database.executar(instrucaoSql);
}

module.exports = {
    tentativasHoje,
    tentativasSemana
}