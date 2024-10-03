import bcrypt from 'bcrypt';
import { check_userExist_by_username, 
        createUserInDB, 
        updatePassword_by_username, 
        unverified_a_user, 
        Get_all_userInDB ,
        Get_unverified_users_fromDB,
        verify_a_user
    } from '../../models/admin/adminCUD.model.js';

export async function createUser(req, res) {
    let { name, username, password, role } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !username || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Normalize inputs
        name = name.toLowerCase();
        username = username.toLowerCase();
        role = role.toLowerCase();

        // Check if the user already exists
        const userExist = await check_userExist_by_username(username);

        if (userExist) { 
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const createUserResult = await createUserInDB(name, username, hashedPassword, role);

        // Send success response
        res.status(200).send({ success: true, message: "User created successfully", userId: createUserResult });
    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the user" });
    }
}


export async function UpdatePassword(req, res) {
    const { username, newPassword } = req.body;

    try {
        // Validate input fields
        if (!username || !newPassword) {
            return res.status(400).json({ success: false, message: "Username and new password are required" });
        }

        // Check if user exists
        const userExist = await check_userExist_by_username(username);
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await updatePassword_by_username(username, hashedPassword);

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log("Error updating password:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the password" });
    }
}

export async function disable_user(req, res) {
    const { username } = req.body;

    try {
        // Validate input
        if (!username) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }

        // Check if user exists
        const userExist = await check_userExist_by_username(username);
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Disable the user (e.g., setting their account to inactive or unverified)
        await unverified_a_user(username);

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
        console.log("Error Get all user:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching users" });
    }
}


export async function getUnverifiedUsers(req, res) {
    try {
        // Fetch unverified users from the database (this assumes you have a field like 'isVerified')
        const unverifiedUsers = await Get_unverified_users_fromDB();

        // if (unverifiedUsers.length === 0) {
        //     return res.status(404).json({ success: true, unverifiedUsers});
        // }

        res.status(200).json({ success: true, unverifiedUsers });
    } catch (error) {
        console.log("Error fetching unverified users:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching unverified users" });
    }
}


export async function reverifyUser(req, res) {
    const { username } = req.body;

    try {
        // Validate input
        if (!username) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }

        // Check if user exists
        const userExist = await check_userExist_by_username(username);
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Re-verify the user (this assumes you have a field like 'isVerified' in your DB)
        await verify_a_user(username);

        res.status(200).json({ success: true, message: "User re-verified successfully" });
    } catch (error) {
        console.log("Error re-verifying user:", error);
        res.status(500).json({ success: false, message: "An error occurred while re-verifying the user" });
    }
}
