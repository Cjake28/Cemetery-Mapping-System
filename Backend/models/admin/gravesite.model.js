import db from '../../db/db.connect.js';

export async function Get_all_personInDB() {
    try {
        const [result] = await db.query(`
            SELECT 
                id,
                name,
                middle_name,
                surname,
                DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth,
                DATE_FORMAT(date_of_death, '%Y-%m-%d') AS date_of_death,
                DATE_FORMAT(burial_date, '%Y-%m-%d') AS burial_date,
                location,
                owner_name,
                isVerified,
                center_lat_lng,
                user_id
            FROM gravesites
            WHERE isVerified = true
        `);

        return result;
    } catch (error) {
        console.error("Error Get_all_personInDB: ", error);
        throw new Error("Database error occurred while getting all persons");
    }
}


export async function createPersonInDB(name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name, center_lat_lng, userId) {
    try {
        const [result] = await db.query(`
           INSERT INTO gravesites (name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name, isVerified, center_lat_lng, user_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?, ?)
        `, [name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name, center_lat_lng, userId]);

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

        return result.affectedRows > 0; // Return true if a row was deleted
    } catch (error) {
        console.error("Error delete_personInDB: ", error);
        throw new Error("Database error occurred while deleting a person");
    }
}

export async function findPersonInDB(name, surname, date_of_birth, date_of_death) {
    try {
        const [result] = await db.query(`
            SELECT * 
            FROM gravesites 
            WHERE LOWER(name) = LOWER(?)
              AND LOWER(surname) = LOWER(?)
              AND date_of_birth = ? 
              AND date_of_death = ?
        `, [name, surname, date_of_birth, date_of_death]);

        // If person exists, return the result, otherwise return null
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error in findPersonInDB:", error);
        throw new Error("Database error occurred while finding the person");
    }
}

// Add to your model file
export async function updateLatLngPointsInDB(id, center_lat_lng ) {
    try {
        const [result] = await db.query(`
            UPDATE gravesites
            SET 
                center_lat_lng = ? 
            WHERE id = ?
        `, [ center_lat_lng, id]);

        return result.affectedRows > 0; // Return true if a row was updated
    } catch (error) {
        console.error("Error updating lat/long points in updateLatLngPointsInDB: ", error);
        throw new Error("Database error occurred while updating lat/long points");
    }
}

// In your model file
export async function updatePersonInDB(id, name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name) {
    try {
        const [result] = await db.query(`
            UPDATE gravesites
            SET 
                name = ?, 
                middle_name = ?, 
                surname = ?, 
                date_of_birth = ?, 
                date_of_death = ?, 
                location = ?, 
                burial_date = ?, 
                owner_name = ?
            WHERE id = ?
        `, [name, middle_name, surname, date_of_birth, date_of_death, location, burial_date, owner_name, id]);

        return result.affectedRows > 0; // Return true if a row was updated
    } catch (error) {
        console.error("Error in updatePersonInDB:", error);
        throw new Error("Database error occurred while updating person");
    }
}
