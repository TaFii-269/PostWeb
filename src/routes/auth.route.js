import express from "express";
import authController from "../app/controllers/AuthController.js";

const router = express.Router();

router.get('/register', authController.registerPage);
router.post('/register', authController.register); // localhost:3000/auth/register
router.get('/login', authController.loginPage);
router.post('/login', authController.login); // localhost:3000/auth/login

export default router;