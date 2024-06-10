var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

router.get("/diario/:idUsuario", function (req, res) {
    dadosController.buscarUltimosDados(req, res);
});

module.exports = router;