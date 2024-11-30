import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../db/models/auth_model.js";

const SECRET =
  "d0d9dc77406ef8cf1f1d461335680c2699db2354816c8077526441907d76d647";

const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: { id: user.id },
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user.id });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server error");
  }
};

const register = async (req, res) => {
  const { name, email, number, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      number,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export default {
  login,
  register,
  getUserProfile,
  validateLogin
};
