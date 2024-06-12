var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/dados/:idUsuario", function (req, res) {
    kpiController.obterKpis(req, res);
});

module.exports = router;