import db from '../db/db.connect.js';

const vacanTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS vacantLot (
      id INT AUTO_INCREMENT PRIMARY KEY,
      location VARCHAR(255) UNIQUE,  -- Ensure each location is unique
      lat_lng_point_center VARCHAR(255),
      user_id INT,
      grave_type VARCHAR(255),  -- Field for grave type
      grave_size VARCHAR(255),  -- Field for grave size
      CONSTRAINT fk_vacantlot_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
    );
  `;
  await db.query(query);
};

export default vacanTable;
