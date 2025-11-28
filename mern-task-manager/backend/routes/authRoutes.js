const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }
  // Create JWT Token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Send token in HTTP-Only cookie (more secure)
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // set to true in production (HTTPS)
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res.status(200).json({
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
