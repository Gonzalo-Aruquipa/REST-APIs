const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const { URL, DB_URL } = process.env;



mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const urlArray = [URL]

const corsOptions = {
  origin: (origin, callback) =>{
    console.log(origin)
    const exists = urlArray.some(dominio => dominio === origin);
    if(exists){
      callback(null, true)
    }else{
      callback(new Error("No permitio por CORS"))
    }
  }
}

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/", routes());

app.use(express.static("uploads"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
