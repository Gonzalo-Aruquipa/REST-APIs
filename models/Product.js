const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String,
  }
})

module.exports = model("Product", productSchema);
