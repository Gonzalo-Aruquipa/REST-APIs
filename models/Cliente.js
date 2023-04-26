const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const clienteSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  }

})

module.exports = model("Cliente", clienteSchema);
