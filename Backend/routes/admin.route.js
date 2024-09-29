import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';
import { createUser, 
        UpdatePassword, 
        disable_user, 
        Get_all_user,
        reverifyUser,
        getUnverifiedUsers
    } from '../controllers/adminController/adminCUD.controller.js'; // Import the admin controller functions

const adminRouter = express.Router();

// Route for creating a user (admin only, requires token and admin role)
adminRouter.post("/create-user", verifyToken, adminRoleValidate, createUser);

// Route for updating password (admin only, requires token and admin role)
adminRouter.patch("/update-password", verifyToken, adminRoleValidate, UpdatePassword);

// Route for disabling a user (admin only, requires token and admin role)
adminRouter.patch("/disable-user", verifyToken, adminRoleValidate, disable_user);

// Route for getting all users (admin only, requires token and admin role)
adminRouter.get("/all-users", verifyToken, adminRoleValidate, Get_all_user);

// Route for disabling a user (admin only, requires token and admin role)
adminRouter.patch("/reverify-user", verifyToken, adminRoleValidate, reverifyUser);

// Route for getting all users (admin only, requires token and admin role)
adminRouter.get("/all-unverify-users", verifyToken, adminRoleValidate, getUnverifiedUsers);

export default adminRouter;
