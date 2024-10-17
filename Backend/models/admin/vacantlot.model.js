import db from '../../db/db.connect.js';

// Get all vacant lots
export async function getAllVacantLots() {
  try {
    const [result] = await db.query(`
      SELECT *
      FROM vacantLot
    `);
    return result;
  } catch (error) {
    console.error("Error fetching all vacant lots: ", error);
    throw new Error("Database error occurred while getting all vacant lots");
  }
}

// Create a vacant lot
export const createVacantLot = async (vacantLotData, user_id) => {
  const {
    location,
    lat_lng_point_one,
    lat_lng_point_two,
    lat_lng_point_three,
    lat_lng_point_four,
    lat_lng_point_center,
  } = vacantLotData;

  const query = `
    INSERT INTO vacantLot (location, lat_lng_point_one, lat_lng_point_two, lat_lng_point_three, lat_lng_point_four, lat_lng_point_center, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [
      location,
      lat_lng_point_one,
      lat_lng_point_two,
      lat_lng_point_three,
      lat_lng_point_four,
      lat_lng_point_center,
      user_id,  // user_id is still being inserted here
    ]);
    return result.insertId;  // Return the ID of the newly created vacant lot
  } catch (error) {
    console.error("Error creating vacant lot: ", error);
    throw new Error("Failed to create vacant lot");
  }
};

// Update a vacant lot
export const updateVacantLot = async (id, updatedData) => {
  const {
    location,
    lat_lng_point_one,
    lat_lng_point_two,
    lat_lng_point_three,
    lat_lng_point_four,
    lat_lng_point_center,
  } = updatedData;

  const query = `
    UPDATE vacantLot
    SET 
      location = ?,
      lat_lng_point_one = ?,
      lat_lng_point_two = ?,
      lat_lng_point_three = ?,
      lat_lng_point_four = ?,
      lat_lng_point_center = ?
    WHERE id = ?;
  `;

  try {
    const [result] = await db.query(query, [
      location,
      lat_lng_point_one,
      lat_lng_point_two,
      lat_lng_point_three,
      lat_lng_point_four,
      lat_lng_point_center,
      id
    ]);
    return result.affectedRows;  // Returns the number of rows updated (1 if successful)
  } catch (error) {
    console.error("Error updating vacant lot: ", error);
    throw new Error("Failed to update vacant lot");
  }
};


export const getVacantLotByLocation = async (location) => {
    const query = `SELECT * FROM vacantLot WHERE LOWER(location) = LOWER(?);`;
  
    try {
      const [result] = await db.query(query, [location]);
  
      if (result.length > 0) {
        return result[0];  // Return the first matching lot if found
      } else {
        return null;  // Return null if no matching location is found
      }
    } catch (error) {
      throw new Error('Fialed checking vacant lot by location');
    }
  };


// Model function to delete a vacant lot
export const deleteVacantLot = async (id) => {
  const query = `DELETE FROM vacantLot WHERE id = ?`;

  try {
    const [result] = await db.query(query, [id]);
    return result.affectedRows;  // Returns the number of rows deleted (should be 1 if successful)
  } catch (error) {
    console.error("Error deleting vacant lot: ", error);
    throw new Error("Failed to delete vacant lot");
  }
};