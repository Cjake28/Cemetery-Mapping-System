import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminUser.route.js'
import gravesiteRoute from './routes/gravesite.route.js';
import vacantLotRoute from './routes/vacantLot.route.js'
import chkcookies from './routes/checkCookie.js'
dotenv.config();

export const app = express();

const allowedOrigins = ['https://himalayan.onrender.com', 'https://cemetery-mapping-system.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/", gravesiteRoute );
app.use("/api/", vacantLotRoute );
app.use("/api/", chkcookies);