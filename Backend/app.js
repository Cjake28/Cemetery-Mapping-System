import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';

dotenv.config();

export const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);