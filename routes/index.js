const Router = require("express");
const clienteController = require("../controllers/clienteController")

const router = Router();

module.exports = function() {

  router.post("/clientes", clienteController.newCliente);
  router.get("/clientes", clienteController.getCliente);
  router.get("/clientes/:id", clienteController.getIdCliente);
  router.put("/clientes/:id", clienteController.updateCliente);
  router.delete("/clientes/:id", clienteController.deleteCliente);

  return router;
}

