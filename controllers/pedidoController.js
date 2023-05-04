const Pedido = require("../models/Pedido");

exports.newPedido = async (req, res) => {
  const pedido = new Pedido(req.body);

  try {
    await pedido.save();
    res.send(pedido);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getPedidos = async (req, res) => {
  const pedidos = await Pedido.find({}).populate("cliente").populate({
    path: "pedido.producto",
    model: "Product",
  });

  res.send(pedidos);
};

exports.getIdPedido = async (req, res, next) => {
  const pedido = await Pedido.findById(req.params.id)
    .populate("cliente")
    .populate({
      path: "pedido.producto",
      model: "Product",
    });

  console.log(pedido);

  try {
    if (!pedido) {
      throw new Error("Pedido not found");
      next();
    }
    res.send(pedido);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updatePedido = async (req, res) => {
  try {
    let pedido = await Pedido.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Product",
      });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deletePedido = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json("Pedido delete successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
