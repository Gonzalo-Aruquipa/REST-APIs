const User = require("../models/User")


exports.register = async(req, res) =>{
  
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send("user created");
  } catch (error) {
    console.log(error)
  }


}

exports.login = () => {
  
}
