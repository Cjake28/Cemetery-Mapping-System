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
    lat_lng_point_one VARCHAR(255),  -- Example value: "14.888419,120.779195"
    lat_lng_point_two VARCHAR(255),
    lat_lng_point_three VARCHAR(255),
    lat_lng_point_four VARCHAR(255),
    user_id INT,  -- Foreign key column linking to the users table
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);
  `;
  await db.query(query);
};

export default createGravesiteTable;