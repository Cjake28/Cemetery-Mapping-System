import db from '../../db/db.connect.js';

export async function Get_all_personInDB() {
    try {
        const [result] = await db.query(`
            SELECT id, name, username, role
            FROM users
            WHERE isVerified = true AND role = 'user'
        `);

        return result;
    } catch (error) {
        console.error("Error Get_all_personInDB: ", error);
        throw new Error("Database error occurred while getting all person");
    }
}