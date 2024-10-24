import express from 'express';
import {signin} from '../controllers/auth/signin.controller.js';
import {checkAuth} from '../controllers/auth/checkAuth.controller.js';
import {verifyToken} from '../middleware/verifyToken.js';
import {signout} from '../controllers/auth/signout.controller.js';
import {checkAuth_VerifyToken} from '../middleware/checkAUthVerifytoken.js'
const authRoutes = express.Router();

authRoutes.post("/signin",signin);

authRoutes.get("/genggeng", checkAuth_VerifyToken, checkAuth);
authRoutes.post("/signout", verifyToken, signout);

export default authRoutes;