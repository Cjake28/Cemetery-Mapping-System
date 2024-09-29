import express from 'express';
import {signin} from '../controllers/auth/signin.controller.js';
import {checkAuth} from '../controllers/auth/checkAuth.controller.js';
import {verifyToken} from '../middleware/verifyToken.js';
import {signout} from '../controllers/auth/signout.controller.js';

const authRoutes = express.Router();

authRoutes.post("/signin",signin);

authRoutes.get("/check-auth", verifyToken, checkAuth);
authRoutes.post("/signout", signout);

export default authRoutes;