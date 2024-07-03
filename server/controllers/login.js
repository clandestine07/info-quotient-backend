const jwt = require("jsonwebtoken");
const User = require("../model/user")
const bcrypt = require("bcrypt")


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "account not found" });
    return;
  }

   const passwordMatched = await bcrypt.compare(password,user.password)

  if (passwordMatched) {
    const token = jwt.sign({ email }, "soweaklol@321");
    const username = email.split('@')[0];
    res.status(200).json({
      token: token,
      message: `Welcome back, ${username}!`
    });
  } else {
    res.status(401).json({ message: "wrong password" });
  }
};

module.exports = login ;