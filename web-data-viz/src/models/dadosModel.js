var database = require("../database/config");

function buscarUltimosDados(idUsuario, limite_linhas) {

    var instrucaoSql = `SSELECT count(fkTentativa) AS qtdTentativas, dtTentativa FROM escolha
                        WHERE fkUsuario = ${idUsuario} GROUP BY dtTentativa ORDER BY dtTentativa DESC LIMIT ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosDados
}
