const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ifUserExists = await User.findOne({ email: email });

    if (ifUserExists) {
      return res.json({
        message: "email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign( { email: savedUser.email }, "soweaklol@321");
    const username = email.split('@')[0];

    res.status(201).json({
      message: `Welcome, ${username}!`,
      token: token
    });
  } catch (error) {
    console.log(error?.message || "Registration unsuccessful");
  }
};

module.exports = register;
