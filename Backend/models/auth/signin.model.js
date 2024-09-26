import db from '../../db/db.connect.js';

export async function getUserName_by_Email(username){
    try{
        const [result] = await db.query(`
            SELECT username, password, isVerified
            FROM users 
            WHERE username = ?    
        `,[username]);
            
        return result;
    }catch(error){
        console.log(error);
        throw new Error('getUserName_by_Email: Database query failed');
    }
}

export const get_id_name_role_Byusername = async(username) =>{
    try{
        const [result] = await db.query(`
            SELECT id, name, role 
            FROM users 
            WHERE username = ?
        `,[username]);
    
        return result;
    }catch(err){
        console.log(err)
        throw new Error('get_id_name_role_Byusername: Database query failed');
    };
}