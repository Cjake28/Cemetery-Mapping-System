import express from 'express';
import {signin} from '../controllers/auth/signin.controller.js';
import {checkAuth} from '../controllers/auth/checkAuth.controller.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/signin",signin);

router.get("/check-auth", verifyToken, checkAuth);

export default router;