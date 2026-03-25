import bcrypt from "bcryptjs";
import User from "../modules/user.js";
import generateToken from "../utils/generateToken.js";
import hashPassword from "../utils/hashPassword.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // !NAME
    if (!name) {
      return res.json({ message: "Name is required" });
    }
    // !EMAIL
    if (!email) {
      return res.json({ message: "Email is required" });
    }
    // !PASSWORD
    if (!password) {
      return res.json({ message: "Password is required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // !CHECK IF USER EXISTS BEFORE
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.json({ message: "Try to login" });
    }
    // !HASHED PASSWORD
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // !GENERATE TOKEN
    const token = generateToken(newUser._id);
    // !SET TOKEN IN COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // !RESPONSE
    res.json({
      message: "User created successfully ",
      user: { name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.log("Error from signup");
    res.json({ message: error.message });
  }
};

// !LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Please fill all fields" });
    }

    // !IF USER EXISTS
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res.json({ message: "Authentication Failed" });
    }

    const isMatchPassword = await bcrypt.compare(password, isUser.password);
    if (!isMatchPassword) {
      return res.json({ message: "Authentication Failed" });
    }

    // !GENERATE TOKEN
    const token = generateToken(isUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Logging Successfully ",
      user: { name: isUser.name, email: isUser.email, role: isUser.role },
    });
  } catch (error) {
    console.log("Error from login ");
    res.json({ message: error.message });
  }
};

// !LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error from logout");
    res.json({ message: error.message });
  }
};

// !TEST
export const test = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error from >>>");
    res.json({ message: error.message });
  }
};
