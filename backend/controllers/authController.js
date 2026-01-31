import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Helper functions

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isStrongPassword = (password) => {
  return password.length >= 6;
};


// REGISTER

export const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Normalize input
    name = name?.trim();
    email = email?.trim().toLowerCase();

    // Required fields check
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // Password strength validation
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      token: generateToken(user._id)
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize input
    email = email?.trim().toLowerCase();

    // Required fields check
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    return res.json({
      token: generateToken(user._id)
    });

  } catch (error) {
   
    return res.status(500).json({
      message: error.message
    });
  }
};


// LOGOUT

export const logoutUser = async (req, res) => {
  try {
    return res.json({
      message: "Logout successful. Remove token from client."
    });
  } catch (error) {
    
    return res.status(500).json({
      message: error.message
    });
  }
};
