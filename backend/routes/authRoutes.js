import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // Registration route
router.post("/login", loginUser); // Login route
router.post("/logout", protect, logoutUser); // Logout route

export default router;
