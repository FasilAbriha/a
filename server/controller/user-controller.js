const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/user-model");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const registerUsers = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      throw new Error("First name, last name, email, phone number, and password must be filled");
    }

    const user_fullName = await userModel.findOne({ firstName, lastName });
    if (user_fullName) {
      return res.status(400).json({ error: "User Name already exists" });
    }

    const user_Email = await userModel.findOne({ email });
    if (user_Email) {
      return res.status(400).json({ error: "User email already exists" });
    }

    const user_Phone = await userModel.findOne({ phone });
    if (user_Phone) {
      return res.status(400).json({ error: "User phone number already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 13);
    await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: passwordHash,
    });

    res.json({ message: "User Successfully Registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password must be provided");
    }

    const thisUser = await userModel.findOne({ email });

    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
      const accessToken = jwt.sign(
        {
          thisUser: {
            email: thisUser.email,
            id: thisUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30m" }
      );

      res.status(200).json({ message: "User logged in", accessToken });
    } else {
      res.status(401).json({ error: "Invalid Email Address or Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userStatus = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

const logoutUsers = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { registerUsers, loginUsers, userStatus, logoutUsers };
