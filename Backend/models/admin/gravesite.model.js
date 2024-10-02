import db from '../../db/db.connect.js';

export async function Get_all_personInDB() {
    try {
        const [result] = await db.query(`
            SELECT *, LOWER(fullname) AS fullname
            FROM gravesites
            WHERE isVerified = true
        `);
        
        return result;
    } catch (error) {
        console.error("Error Get_all_personInDB: ", error);
        throw new Error("Database error occurred while getting all persons");
    }
}

export async function createPersonInDB(fullname, date_of_birth, date_of_death,location, burial_date,expiration_date,owner_name){
    try {
        const [result] = await db.query(`
            INSERT INTO 
            gravesites(fullname, date_of_birth, date_of_death, location, burial_date, expiration_date, owner_name)
            VALUES(?, ?, ?, ?, ?, ?, ?) 
        `,[fullname, date_of_birth, date_of_death, location, burial_date, expiration_date, owner_name]);
    
        return result.insertId;
    } catch (error) {
        console.error("Error createPersonInDB: ", error);
        throw new Error("Database error occurred while creating a person");
    }
}

export async function delete_personInDB(id) {
    try {
        const [result] = await db.query(`
            DELETE FROM gravesites
            WHERE id = ?
        `, [id]);
        
        return result.affectedRows > 0; // Return true if a row was deleted, false otherwise
    } catch (error) {
        console.error("Error delete_personInDB: ", error);
        throw new Error("Database error occurred while deleting a person");
    }
}

export async function findPersonInDB(fullname, date_of_birth, date_of_death) {
    try {
        const [result] = await db.query(`
            SELECT * 
            FROM gravesites 
            WHERE LOWER(fullname) = LOWER(?) 
              AND date_of_birth = ? 
              AND date_of_death = ?
        `, [fullname, date_of_birth, date_of_death]);

        // If person exists, return the result, otherwise return null
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error in findPersonInDB:", error);
        throw new Error("Database error occurred while finding the person");
    }
}
