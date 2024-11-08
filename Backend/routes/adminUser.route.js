import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { adminRoleValidate } from '../middleware/adminRoleValidate.js';
import { createUser, 
        updatePassword, 
        disable_user, 
        Get_all_user,
        reverifyUser,
        getUnverifiedUsers,
        deleteUser
    } from '../controllers/adminController/adminCUD.controller.js'; // Import the admin controller functions

const adminUserRouter = express.Router();

// Route for creating a user (admin only, requires token and admin role)
adminUserRouter.post("/create-user", verifyToken, adminRoleValidate, createUser);

// Route for updating password (admin only, requires token and admin role)
adminUserRouter.patch("/update-password", verifyToken, adminRoleValidate, updatePassword);

// Route for disabling a user (admin only, requires token and admin role)
adminUserRouter.patch("/disable-user", verifyToken, adminRoleValidate, disable_user);

// Route for getting all users (admin only, requires token and admin role)
adminUserRouter.get("/all-users", verifyToken, adminRoleValidate, Get_all_user);

// Route for reverify a user (admin only, requires token and admin role)
adminUserRouter.patch("/reverify-user", verifyToken, adminRoleValidate, reverifyUser);

// Route for getting all unverify users (admin only, requires token and admin role)
adminUserRouter.get("/all-unverify-users", verifyToken, adminRoleValidate, getUnverifiedUsers);

adminUserRouter.delete("/delete-user", verifyToken, adminRoleValidate, deleteUser);

export default adminUserRouter;
