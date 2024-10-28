const express = require("express");
const { UserModel } = require("../Models/UserModel");
require("dotenv").config();

const userRouter = express.Router();

// Middleware to parse JSON bodies
userRouter.use(express.json());

// POST request to create a new user
userRouter.post("/adduser", async (req, res) => {
    const { name, email, phone, instagram, score } = req.body;
  
    try {
      const newUser = new UserModel({ name, email, phone, instagram, score });
      await newUser.save();
      res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error); // More detailed error logging
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  });
  

// GET request to check if an email exists
userRouter.get("/check-email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "Email exists", exists: true });
    } else {
      return res.status(200).json({ message: "Email does not exist", exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking email", error: error.message });
  }
});

module.exports = {
  userRouter,
};
