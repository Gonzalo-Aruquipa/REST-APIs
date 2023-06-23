const Product = require("../models/Product");

const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no válido"));
    }
  },
};

const upload = multer(configuracionMulter).single("image");

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ message: error });
    }
    return next();
  });
};
exports.newProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    if (req.file.filename) {
      product.image = req.file.filename;
    }

    await product.save();
    res.status(200).send({ message: "product created Successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
    next();
  }
};

exports.getIdProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.updateProduct = async (req, res) => {
  try {
    let producto = await Product.findById(req.params.id);

    let newProduct = req.body;

    if (req.file) {
      newProduct.image = req.file.filename;
    } else {
      newProduct.image = producto.image;
    }

    let product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      newProduct,
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product delete successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.searchProduct = async (req, res) => {

  const {name} = req.query;

  try {
    const product = await Product.find({name: new RegExp(name, "i")})
    res.send(product)
    
  } catch (error) {
    console.log(error)
  }

}
