import express  from "express";
import authController from "../controllers";
const router = express.Router();

// Post request
router.post('/login');
router.post('/register');