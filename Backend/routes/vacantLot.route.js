import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';
import { 
  getVacantLotsController, 
  createVacantLotController, 
  updateVacantLotController, 
  deleteVacantLotController 
} from '../controllers/adminController/vacantLot.controller.js';

const vacantLotRoute = express.Router();

// Route for getting all vacant lots (admin only, requires token and admin role)
vacantLotRoute.get('/vacantlots', verifyToken, getVacantLotsController);  // GET all vacant lots
vacantLotRoute.post('/vacantlots', verifyToken, adminRoleValidate, createVacantLotController);  // Create a new vacant lot
vacantLotRoute.put('/vacantlots/:id', verifyToken, adminRoleValidate, updateVacantLotController);  // Update an existing vacant lot by ID

// Route for deleting an existing vacant lot by ID (admin only, requires token and admin role)
vacantLotRoute.delete('/vacantlots/:id', verifyToken, adminRoleValidate, deleteVacantLotController);  // Delete a vacant lot

export default vacantLotRoute;
