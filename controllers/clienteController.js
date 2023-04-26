const Cliente = require("../models/Cliente");

exports.newCliente = async(req, res) => {


  const cliente = new Cliente(req.body);
  try {
    await cliente.save();
    res.status(200).send({message: "Created Successfully"});
    
  } catch (error) {
    res.status(400).send(error.message);
  }
};
