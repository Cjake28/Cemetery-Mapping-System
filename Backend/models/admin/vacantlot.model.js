import db from '../../db/db.connect.js';

// Get all vacant lots
export async function getAllVacantLots() {
  try {
    const [result] = await db.query(`SELECT * FROM vacantLot`);
    return result;
  } catch (error) {
    console.error("Error fetching all vacant lots: ", error);
    throw new Error("Database error occurred while getting all vacant lots");
  }
}

// Create a vacant lot
export const createVacantLot = async (vacantLotData, user_id) => {
  const { location, lat_lng_point_center } = vacantLotData;

  const query = `
    INSERT INTO vacantLot (location, lat_lng_point_center, user_id)
    VALUES (?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [location, lat_lng_point_center, user_id]);
    return result.insertId;
  } catch (error) {
    console.error("Error creating vacant lot: ", error);
    throw new Error("Failed to create vacant lot");
  }
};

// Update a vacant lot
export const updateVacantLot = async (id, updatedData) => {
  const { location, lat_lng_point_center } = updatedData;

  const query = `
    UPDATE vacantLot
    SET location = ?, lat_lng_point_center = ?
    WHERE id = ?;
  `;

  try {
    const [result] = await db.query(query, [location, lat_lng_point_center, id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating vacant lot: ", error);
    throw new Error("Failed to update vacant lot");
  }
};

// Get vacant lot by location
export const getVacantLotByLocation = async (location) => {
  const query = `SELECT * FROM vacantLot WHERE LOWER(location) = LOWER(?);`;

  try {
    const [result] = await db.query(query, [location]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error checking vacant lot by location: ", error);
    throw new Error("Failed checking vacant lot by location");
  }
};

// Delete a vacant lot
export const deleteVacantLot = async (id) => {
  const query = `DELETE FROM vacantLot WHERE id = ?`;

  try {
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting vacant lot: ", error);
    throw new Error("Failed to delete vacant lot");
  }
};
