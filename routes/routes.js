const express = require("express")
const router = express.Router()
var myController = require("../controllers/mycontroller")

router.get("/", myController.showForm)
router.post("/", myController.save)
router.get("/show", myController.showResult)
router.post("/search", myController.search)
router.post("/dept", myController.dept)
router.get("/menor", myController.menorSalario)
router.get("/maior", myController.maiorSalario)
router.get("/qtd", myController.qtdAdm)

module.exports = router