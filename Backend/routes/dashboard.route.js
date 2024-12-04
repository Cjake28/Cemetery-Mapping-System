import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';
import { admin_counts, user_counts, fetch_burial_metrics, getOcupied_vacantlots } from '../controllers/adminController/dashboard.controller.js';

const dashboardRouter = express.Router();

dashboardRouter.get("/admin-counts", verifyToken, adminRoleValidate, admin_counts);

dashboardRouter.get("/user-counts", verifyToken, adminRoleValidate, user_counts);

dashboardRouter.get("/burial_data", verifyToken, adminRoleValidate, fetch_burial_metrics);

dashboardRouter.get("/lot-counts", verifyToken, adminRoleValidate, getOcupied_vacantlots);

export default dashboardRouter;
