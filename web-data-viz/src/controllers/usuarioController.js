var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    res.json({
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        senha: resultadoAutenticar[0].senha
                    });

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores

    // Validações email
    var listaProvedores = ["gmail.com", "hotmail.com", "protonmail.com", "outlook.com"]
    var posicaoArrobaEmail = email.indexOf("@")
    var posicaoProvedor = 0
    var temProvedorInvalido = false

    for (let posicao = 0; posicao < listaProvedores.length; posicao++) {
        let provedor = listaProvedores[posicao]
        posicaoProvedor = email.indexOf(provedor)
        temProvedorInvalido = posicaoProvedor == -1

        if (!temProvedorInvalido) {
            break
        }
    }

    var provedorAntesArroba = posicaoArrobaEmail > provedor


    if (nome == undefined) {
        res.status(400).send("Seu nome está vazio!");
    } else if (email == undefined || temProvedorInvalido || provedorAntesArroba) {
        res.status(400).send("Email inválido! O provedor deve ser gmail, outlook, hotmail ou protonmail e o '@' deve vir antes do provedor");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está vazia!");
    }

    usuarioModel.validarEmail(email)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(400).send("Este email já foi cadastrado!");
                } else {

                    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

                    usuarioModel.cadastrar(nome, email, senha)
                        .then(
                            function (resultado) {
                                res.json(resultado);
                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                                    erro.sqlMessage
                                );
                                res.status(500).json(erro.sqlMessage);
                            }
                        );
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Não foi possível pegar o email para validação")
            }
        )

}

module.exports = {
    autenticar,
    cadastrar
}