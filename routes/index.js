const Router = require("express");
const clienteController = require("../controllers/clienteController");
const productController = require("../controllers/productController");
const pedidoController = require("../controllers/pedidoController");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = Router();

module.exports = function () {
  router.post("/clientes", auth, clienteController.newCliente);
  router.get("/clientes", auth, clienteController.getCliente);
  router.get("/clientes/:id", auth, clienteController.getIdCliente);
  router.put("/clientes/:id", auth, clienteController.updateCliente);
  router.delete("/clientes/:id", auth, clienteController.deleteCliente);

  router.post(
    "/products",
    productController.subirArchivo,
    productController.newProduct
  );
  router.get("/products", auth, productController.getProducts);
  router.get("/products/:id", auth, productController.getIdProducts);
  router.put(
    "/products/:id",
    auth,
    productController.subirArchivo,
    productController.updateProduct
  );
  router.delete("/products/:id", auth, productController.deleteProduct);
  router.get("/search", auth, productController.searchProduct);

  router.post("/pedidos", auth, pedidoController.newPedido);
  router.get("/pedidos", auth, pedidoController.getPedidos);
  router.get("/pedidos/:id", pedidoController.getIdPedido);
  router.put("/pedidos/:id", pedidoController.updatePedido);
  router.delete("/pedidos/:id", pedidoController.deletePedido);

  router.post("/register", userController.register);
  router.post("/login", userController.login);

  return router;
};
