const Router = require("express");
const clienteController = require("../controllers/clienteController");
const productController = require("../controllers/productController");
const pedidoController = require("../controllers/pedidoController");

const router = Router();

module.exports = function () {
  router.post("/clientes", clienteController.newCliente);
  router.get("/clientes", clienteController.getCliente);
  router.get("/clientes/:id", clienteController.getIdCliente);
  router.put("/clientes/:id", clienteController.updateCliente);
  router.delete("/clientes/:id", clienteController.deleteCliente);

  router.post(
    "/products",
    productController.subirArchivo,
    productController.newProduct
  );
  router.get("/products", productController.getProducts);
  router.get("/products/:id", productController.getIdProducts);
  router.put(
    "/products/:id",
    productController.subirArchivo,
    productController.updateProduct
  );
  router.delete("/products/:id", productController.deleteProduct);
  router.get("/search", productController.searchProduct);

  router.post("/pedidos", pedidoController.newPedido);
  router.get("/pedidos", pedidoController.getPedidos);
  router.get("/pedidos/:id", pedidoController.getIdPedido);
  router.put("/pedidos/:id", pedidoController.updatePedido);
  router.delete("/pedidos/:id", pedidoController.deletePedido);

  return router;
};
