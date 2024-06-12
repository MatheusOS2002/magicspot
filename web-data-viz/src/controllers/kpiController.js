var kpiModel = require("../models/kpiModel");

function obterKpis(req, res) {
    idUsuario = req.params.idUsuario

    kpiModel.tentativasHoje(idUsuario)
        .then(function (resultado1) {

            if (resultado1.length < 1) {
                resultado1[0].hoje = 0
            }

                kpiModel.tentativasSemana(idUsuario)
                    .then(function (resultado) {

                            res.status(200).json({
                                hoje: resultado1[0].hoje,
                                semana: resultado[0].semana || 0
                            });
                            
                    }).catch(function (erro) {
                        console.log(erro);
                        console.log("Houve um erro ao buscar as tentativas da semana.", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    });

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as tentativas de hoje.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterKpis
}