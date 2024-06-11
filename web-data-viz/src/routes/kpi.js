var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/hoje/:idUsuario", function (req, res) {
    kpiController.obterKpiHoje(req, res);
});

router.get("/semana/:idUsuario", function (req, res) {
    kpiController.obterKpiSemana(req, res);
});

module.exports = router;