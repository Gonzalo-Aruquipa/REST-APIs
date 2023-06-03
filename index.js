const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restapis", {
  useNewUrlParser: true,
});

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes());

app.use(express.static("uploads"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
