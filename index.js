const express = require("express");
const routes = require("./routes")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restapis",{
  useNewUrlParser: true
}
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes())

app.listen(3000, () => {
  console.log("listening on port 3000")
})
