import db from '../db/db.connect.js'

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    isVerified BOOLEAN DEFAULT TRUE,
    lastLogin DATETIME DEFAULT NULL,
    resetPasswordCode VARCHAR(255) DEFAULT NULL,
    resetPasswordCodeExpiresAt DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
  `;
  await db.query(query);
};

export default createUsersTable;