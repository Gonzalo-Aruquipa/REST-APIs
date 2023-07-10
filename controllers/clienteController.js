const Cliente = require("../models/Cliente");

exports.newCliente = async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    await cliente.save();
    res.status(200).send({ message: "Created Successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getCliente = async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    res.send(clientes);
  } catch (error) {
    res.status(400).send(error.message);
    next();
  }
};

exports.getIdCliente = async (req, res, next) => {
  const cliente = await Cliente.findById(req.params.id);
  try {
    if (!cliente) {
      throw new Error("cliente not found");
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.updateCliente = async (req, res) => {
  try {
    let cliente = await Cliente.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete client successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
