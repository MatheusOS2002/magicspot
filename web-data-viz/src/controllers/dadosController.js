var dadosModel = require("../models/dadosModel");

function buscarUltimosDados(req, res) {

    const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando os últimos ${limite_linhas} dados`);

    dadosModel.buscarUltimosDados(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirDados(req, res) {
    dadosModel.inserirDados(idUsuario)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    )
    .catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao inserir os dados! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    buscarUltimosDados,
    inserirDados
}