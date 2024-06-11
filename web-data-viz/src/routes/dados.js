var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

router.get("/diario/:idUsuario", function (req, res) {
    dadosController.buscarUltimosDados(req, res);
});

router.post("/inserir/:idUsuario", function (req, res) {
    dadosController.inserirDados(req, res);
})

router.post("/inserir/numero/parcelas/", function (req, res) {
    dadosController.inserirParcelas(req, res);
})

router.post("/inserir/escolha/:idUsuario", function (req, res) {
    dadosController.inserirEscolha(req, res);
})

module.exports = router;