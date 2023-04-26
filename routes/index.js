const Router = require("express");
const clienteController = require("../controllers/clienteController")

const router = Router();

module.exports = function() {

  router.post("/clientes", clienteController.newCliente);

  return router;
}

