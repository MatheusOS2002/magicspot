var kpiModel = require("../models/kpiModel");

function obterKpiHoje(req, res) {
    idUsuario = req.params.idUsuario

    kpiModel.tentativasHoje(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as tentativas de hoje.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterKpiSemana(req, res) {
    
    idUsuario = req.params.idUsuario

    kpiModel.tentativasSemana(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as tentativas da semana.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterKpiHoje,
    obterKpiSemana
}