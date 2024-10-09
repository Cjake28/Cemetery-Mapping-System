import db from '../db/db.connect.js'

const createGravesiteTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS gravesites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      middle_name VARCHAR(255),
      surname VARCHAR(255),
      date_of_birth DATE,
      date_of_death DATE,
      location VARCHAR(255),
      burial_date DATE,
      isVerified BOOLEAN DEFAULT TRUE,
      owner_name VARCHAR(255),
      notes TEXT,
      lat_lng_top_right VARCHAR(255),  -- Example value: "14.888419,120.779195"
      lat_lng_top_left VARCHAR(255),
      lat_lng_bottom_right VARCHAR(255),
      lat_lng_bottom_left VARCHAR(255)
    );
  `;
  await db.query(query);
};

export default createGravesiteTable;