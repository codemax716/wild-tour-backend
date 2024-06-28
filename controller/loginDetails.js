const dbAuth = require('../database/auth')
const bcrypt = require('bcrypt')
const helper = require('../middleware/helper')


exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Required data is missing" });
    }
    const existingUser = await dbAuth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await dbAuth.create({ name, email, password: hashedPassword, phone });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await dbAuth.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ status: false, msg: "Incorrect password" });
    }
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
    const token = helper.Authentication(data)
    res.status(200).json({ status: true, msg: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
};


