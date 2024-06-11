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
    var idUsuario = req.params.idUsuario;

    var qtdNumeros = req.body.qtdNumeros;
    var qtdAlgarismos = req.body.qtdAlgarismos;
    var resultadoFinal = req.body.resultadoFinal;

    dadosModel.verificarUltimaTentativa(idUsuario)
        .then(
            function (resposta) {
                var ultimaTentativa = resposta[0].ultimaTentativa || 0
                console.log(`\nUltima tentativa: ${ultimaTentativa}\n`)
                var idTentativa = ultimaTentativa + 1
                dadosModel.inserirTentativa(idTentativa, idUsuario, qtdNumeros, qtdAlgarismos, resultadoFinal)
                    .then(
                        function (resultado) {
                            res.json(resultado)
                        }
                    )
                    .catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao inserir a tentativa! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );

            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao varificar a última tentativa! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function inserirParcelas(req, res) {
    var parcela = req.body.parcela;

    dadosModel.inserirParcelas(parcela)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao inserir os números! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function inserirEscolha(req, res) {

    var idUsuario = req.params.idUsuario;

    dadosModel.verificarUltimaTentativa(idUsuario)
        .then(
            function (resposta) {
                var idTentativa = resposta[0].ultimaTentativa
                console.log(`\nUltima tentativa: ${idTentativa}\n`)

                dadosModel.verificarUltimaEscolha(idUsuario)
                    .then(
                        function (resposta) {
                            var ultimaEscolha = resposta[0].ultimaEscolha || 0
                            console.log(`\nUltima escolha: ${ultimaEscolha}\n`)
                            var idEscolha = ultimaEscolha + 1

                            dadosModel.verificarNumeroInserido()
                                .then(
                                    function (resposta) {
                                        var idNumero = resposta[0].ultimoNumero
                                        console.log(`\nÚltimo número: ${idNumero}\n`)

                                        dadosModel.inserirEscolha(idEscolha, idUsuario, idTentativa, idNumero)
                                            .then(
                                                function (resposta) {
                                                    res.json(resposta)
                                                }
                                            )
                                            .catch(
                                                function (erro) {
                                                    console.log(erro);
                                                    console.log(
                                                        "\nHouve um erro ao inserir a escolha! Erro: ",
                                                        erro.sqlMessage
                                                    );
                                                    res.status(500).json(erro.sqlMessage);
                                                }
                                            );
                                    }
                                )
                                .catch(
                                    function (erro) {
                                        console.log(erro);
                                        console.log(
                                            "\nHouve um erro ao verificar o último número inserido! Erro: ",
                                            erro.sqlMessage
                                        );
                                        res.status(500).json(erro.sqlMessage);
                                    }
                                );
                        }
                    )
                    .catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao varificar a última escolha! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    )
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao varificar a última tentativa! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    buscarUltimosDados,
    inserirParcelas,
    inserirDados,
    inserirEscolha
}