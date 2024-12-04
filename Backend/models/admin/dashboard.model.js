import db from '../../db/db.connect.js';



export async function admin_counts_model(){
    try {
        const [reuslt] = await db.query(`
            SELECT COUNT(*) AS admin_count 
            FROM users 
            WHERE role = "admin" AND isVerified = true
        `);

        return reuslt[0].admin_count
        
    } catch (error) {
        console.log("admin_counts: ", error);
        throw error;
    }
}

export async function user_counts_model(){
    try {
        const [reuslt] = await db.query(`
            SELECT COUNT(*) AS user_count  
            FROM users 
            WHERE role = "user" AND isVerified = true
        `);
            
        return reuslt[0].user_count;

    } catch (error) {
        console.log("user_counts: ", error);
        throw error;
    }
}

// Fetch total burials grouped by month for a specific year
export async function burials_by_month_model(year) {
    try {
        const [result] = await db.query(`
            SELECT 
                DATE_FORMAT(burial_date, '%Y-%m') AS month, 
                COUNT(*) AS total_burials 
            FROM gravesites 
            WHERE burial_date IS NOT NULL AND YEAR(burial_date) = ? 
            GROUP BY month 
            ORDER BY month;
        `, [year]);

        return result.length ? result : []; // Return an empty array if no data
    } catch (error) {
        console.error("Error in burials_by_month_model:", error);
        throw error;
    }
}

// Fetch the month with the least burials in a specific year
export async function least_burials_month_model(year) {
    try {
        const [result] = await db.query(`
            SELECT 
                DATE_FORMAT(burial_date, '%Y-%m') AS month, 
                COUNT(*) AS total_burials 
            FROM gravesites 
            WHERE burial_date IS NOT NULL AND YEAR(burial_date) = ? 
            GROUP BY month 
            ORDER BY total_burials ASC 
            LIMIT 1;
        `, [year]);

        return result.length ? result[0] : null; // Return null if no data
    } catch (error) {
        console.error("Error in least_burials_month_model:", error);
        throw error;
    }
}

// Fetch average burials per month for a specific year
export async function average_burials_month_model(year) {
    try {
        const [result] = await db.query(`
            SELECT 
                AVG(monthly_burials) AS avg_burials_per_month 
            FROM (
                SELECT 
                    COUNT(*) AS monthly_burials 
                FROM gravesites 
                WHERE burial_date IS NOT NULL AND YEAR(burial_date) = ? 
                GROUP BY DATE_FORMAT(burial_date, '%Y-%m')
            ) AS monthly_totals;
        `, [year]);

        return result[0].avg_burials_per_month || 0; // Default to 0 if no data
    } catch (error) {
        console.error("Error in average_burials_month_model:", error);
        throw error;
    }
}

export async function get_accupied_vacant_lot(year) {
    try {
        const [result] = await db.query(`
            SELECT 
                AVG(monthly_burials) AS avg_burials_per_month 
            FROM (
                SELECT 
                    COUNT(*) AS monthly_burials 
                FROM gravesites 
                WHERE burial_date IS NOT NULL AND YEAR(burial_date) = ? 
                GROUP BY DATE_FORMAT(burial_date, '%Y-%m')
            ) AS monthly_totals;
        `, [year]);

        return result[0].avg_burials_per_month || 0; // Default to 0 if no data
    } catch (error) {
        console.error("Error in average_burials_month_model:", error);
        throw error;
    }
}

export const countAllOcupiedLots = async () => {
    try {
      const query = 'SELECT COUNT(*) AS total FROM gravesites;';
      const [rows] = await db.query(query);
      return rows[0]?.total || 0; // Return the total count, or 0 if no rows
    } catch (error) {
      console.error('Error counting ocupied gravesites:', error);
      throw new Error('Failed to count ocupied gravesites.');
    }
  };

  export const countAllVacantLots = async () => {
    try {
      const query = 'SELECT COUNT(*) AS total FROM vacantLot;';
      const [rows] = await db.query(query);
      return rows[0]?.total || 0; // Return the total count, or 0 if no rows
    } catch (error) {
      console.error('Error counting vacantLot:', error);
      throw new Error('Failed to count vacantLot.');
    }
  };


