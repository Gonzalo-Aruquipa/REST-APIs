const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const user = new User(req.body);
  try {
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(user.password, salt);
    await user.save();
    res.status(200).send("user created");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          perfil: user.perfil,
          email: user.email,
        },
        "top_secret",
        {
          expiresIn: "1d",
        }
      );
      res.send(token);
    } else {
      res.status(400).send("Incorrect password");
    }
  } else {
    res.status(401).send("Invalid User");
  }
};
