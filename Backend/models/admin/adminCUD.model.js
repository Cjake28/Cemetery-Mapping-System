import db from '../../db/db.connect.js';

export async function createUserInDB(name, username, password) {
    try {
        const [result] = await db.query(`
            INSERT INTO 
            users(name, username, password)
            VALUES(?,?,?)
        `, [name, username, password]);
        
        if (!result || !result.insertId) {
            console.log("Failed to create user");
            throw new Error("Failed to insert user in the database");
        }
        
        return result.insertId;
    } catch (error) {
        console.log("create user: ", error);
        throw error;
    }
}


export async function updatePassword_by_username(userID, password) {
    try {
        const [result] = await db.query(`
            UPDATE users
            SET password = ? 
            WHERE id = ?
        `, [password, userID]);

        return result;
    } catch (error) {
        console.log("update password: ", error);
        throw error;
    }
}

export async function unverified_a_user(userId) {
    try {
        const [result] = await db.query(`
            UPDATE users
            SET isVerified = false
            WHERE id = ?
        `, [userId]);

        return result;
    } catch (error) {
        console.error("Error unverified_a_user: ", error);
        throw new Error("Database error occurred while unverifying a user");
    }
}

export async function Get_all_userInDB() {
    try {
        const [result] = await db.query(`
            SELECT id, name, username, role
            FROM users
            WHERE isVerified = true AND role = 'user'
        `);

        return result;
    } catch (error) {
        console.error("Error Get_all_user: ", error);
        throw new Error("Database error occurred while getting all users");
    }
}


export async function check_userExist_by_username(username) {
    try {
        const [result] = await db.query(
            `
            SELECT * FROM users
            WHERE username = ?
            LIMIT 1
            `,[username]);

        // Return true if the user exists, false otherwise
        return result.length > 0 ? true : false;
    } catch (error) {
        console.error("Error checking if user exists: ", error);
        throw new Error("Database error occurred while checking user existence");
    }
}

// Fetch all unverified users from the database
export async function Get_unverified_users_fromDB() {
    // Query to get users who are unverified (e.g., isVerified = false)
    try {
        const [result] = await db.query(`
            SELECT id, name, username ,role 
            FROM users 
            WHERE isVerified = false
            `);

        return result;
    } catch (error) {
        console.error("Error Get_unverified_users_fromDB: ", error);
        throw new Error("Database error occurred while Get_unverified_users_fromDB");
    }

}

// Re-verify a user (update isVerified field)
export async function verify_a_user(userId) {
    // Query to update the user and set isVerified to true
    try {
        const [result] = await db.query(`
            UPDATE users 
            SET isVerified = true 
            WHERE id = ?
            `,[userId]);

        return result;
    } catch (error) {
        console.error("Error verify_a_user: ", error);
        throw new Error("Database error occurred while verify_a_user");
    }
}
