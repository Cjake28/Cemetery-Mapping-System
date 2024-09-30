import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';


const gravesiteRoute = express.Router();

// Route for creating a user (admin only, requires token and admin role)
gravesiteRoute.post("/get-all-person", verifyToken, adminRoleValidate);

export default gravesiteRoute;