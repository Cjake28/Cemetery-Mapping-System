import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';
import { getAllPersons, createPerson, deletePerson } from '../controllers/adminController/gravesite.controller.js';  // Assuming your controller is named gravesiteController.js

const gravesiteRoute = express.Router();

// Route for getting all persons (admin only, requires token and admin role)
gravesiteRoute.get("/get-all-person", verifyToken, getAllPersons);

// Route for creating a person (admin only, requires token and admin role)
gravesiteRoute.post("/admin/create-person", verifyToken, adminRoleValidate, createPerson);

// Route for deleting a person (admin only, requires token and admin role)
gravesiteRoute.delete("/admin/delete-person/:id", verifyToken, adminRoleValidate, deletePerson);

export default gravesiteRoute;
