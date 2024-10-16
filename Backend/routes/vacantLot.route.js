import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';
import { getVacantLotsController, createVacantLotController, updateVacantLotController } from '../controllers/adminController/vacantLot.controller.js';

const vacantLotRoute = express.Router();

// Route for getting all persons (admin only, requires token and admin role)
vacantLotRoute.get('/vacantlots', verifyToken, getVacantLotsController);  // GET all vacant lots
vacantLotRoute.post('/vacantlots',verifyToken, adminRoleValidate, createVacantLotController);  // Create a new vacant lot
vacantLotRoute.put('/vacantlots/:id',verifyToken, adminRoleValidate, updateVacantLotController);  // Update an existing vacant lot by ID

export default vacantLotRoute;
