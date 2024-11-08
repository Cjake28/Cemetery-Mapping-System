import bcrypt from 'bcrypt';
import { 
    check_userExist_by_username, 
    createUserInDB, 
    updatePassword_by_username, 
    unverified_a_user, 
    Get_all_userInDB, 
    Get_unverified_users_fromDB, 
    verify_a_user,
    delete_user 
} from '../../models/admin/adminCUD.model.js';

export async function createUser(req, res) {
    let { name, username, password } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Normalize inputs
        name = name.toLowerCase();
        username = username.toLowerCase();

        // Check if the user already exists
        const userExist = await check_userExist_by_username(username);

        if (userExist) { 
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const createUserResult = await createUserInDB(name, username, hashedPassword);

        // Send success response
        res.status(200).send({ success: true, message: "User created successfully", userId: createUserResult });
    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the user" });
    }
}

export async function updatePassword(req, res) {
    const { userID, newPassword } = req.body;

    try {
        // Validate input fields
        if (!userID || !newPassword) {
            return res.status(400).json({ success: false, message: "User ID and new password are required" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await updatePassword_by_username(userID, hashedPassword);

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log("Error updating password:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the password" });
    }
}

export async function disable_user(req, res) {
    const { userID } = req.body;

    try {
        // Validate input
        if (!userID) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Disable the user (unverify them)
        await unverified_a_user(userID);

        res.status(200).json({ success: true, message: "User disabled successfully" });
    } catch (error) {
        console.log("Error disabling user:", error);
        res.status(500).json({ success: false, message: "An error occurred while disabling the user" });
    }
}

export async function Get_all_user(req, res) {
    try {
        // Fetch all users from the database
        const users = await Get_all_userInDB();

        // Return the result
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error getting all users:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching users" });
    }
}

export async function getUnverifiedUsers(req, res) {
    try {
        // Fetch unverified users from the database
        const unverifiedUsers = await Get_unverified_users_fromDB();

        res.status(200).json({ success: true, unverifiedUsers });
    } catch (error) {
        console.log("Error fetching unverified users:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching unverified users" });
    }
}

export async function reverifyUser(req, res) {
    const { userID } = req.body;

    try {
        // Validate input
        if (!userID) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Re-verify the user
        await verify_a_user(userID);

        res.status(200).json({ success: true, message: "User re-verified successfully" });
    } catch (error) {
        console.log("Error re-verifying user:", error);
        res.status(500).json({ success: false, message: "An error occurred while re-verifying the user" });
    }
}

export async function deleteUser(req, res) {
    const { userID } = req.body;

    try {
        // Check if userID is provided
        if (!userID) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Attempt to delete the user
        const deleted = await delete_user(userID);

        // Check if the user was successfully deleted
        if (deleted) {
            return res.status(200).json({ success: true, message: "User deleted successfully" });
        } else {
            return res.status(404).json({ success: false, message: "User not found or already deleted" });
        }
    } catch (error) {
        console.log("Error deleting user:", error);
        return res.status(500).json({ success: false, message: "An error occurred while deleting the user" });
    }
}

