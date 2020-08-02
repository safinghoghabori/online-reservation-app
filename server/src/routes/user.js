const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    // Instance of User model to insert data
    const user = new User({
      firstname: fname,
      lastname: lname,
      email: email,
      password: password,
    });

    // Save data into db
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: "Something went wrong!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password!" });
    }

    res.json(user);
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
