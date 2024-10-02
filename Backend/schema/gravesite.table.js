import db from '../db/db.connect.js'

const createGravesiteTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS gravesites (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullname VARCHAR(255) NOT NULL,     -- Full name of the person
            first_name VARCHAR(255),   -- First name of the person
            middle_name VARCHAR(255),           -- Middle name of the person (optional)
            surname VARCHAR(255),      -- Surname of the person
            date_of_birth DATE,                 -- Date of birth
            date_of_death DATE,                 -- Date of death
            location VARCHAR(255),            -- Formal identifier for the grave location
            section VARCHAR(100),               -- Section of the cemetery
            plot VARCHAR(100),                  -- Specific plot within a section
            burial_date DATE,                   -- Date when the person was buried
            expiration_date DATE,               -- Date when the burial rights expire (if applicable)
            isVerified BOOLEAN DEFAULT TRUE,    -- Indicates if the gravesite entry is verified (default true)
            owner_name VARCHAR(255),            -- Name of the lot owner
            notes TEXT                          -- Additional notes
        );
  `;
  await db.query(query);
};

export default createGravesiteTable;