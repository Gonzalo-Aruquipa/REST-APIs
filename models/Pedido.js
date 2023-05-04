const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const pedidoSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: "Cliente"
  },
  pedido: [{
    producto: {
      type:  Schema.ObjectId,
      ref: "Product"
    },
    cantidad:  Number
  }],

  total: {
    type: Number
  }
});

module.exports = model("Pedido", pedidoSchema)
