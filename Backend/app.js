import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminUser.route.js'
import gravesiteRoute from './routes/gravesite.route.js';
import vacantLotRoute from './routes/vacantLot.route.js'
dotenv.config();

export const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/", gravesiteRoute );
app.use("/api/", vacantLotRoute );