import bcrypt from 'bcrypt';
import {generateTokenAndSetCookie} from '../../utils/generateTokenAndSetCookie.js'
import {getUserName_by_Email, get_id_name_role_Byusername} from '../../models/auth/signin.model.js'

export const signin = async (req, res) =>{
    const {username, password} = req.body;

    try{
        if(!username || !password){
            throw new Error("All fields are required");
        }

        const usernameLower = username.toLowerCase();
        const queryUserName_password = await getUserName_by_Email(usernameLower);

        const userExist = queryUserName_password && queryUserName_password.length > 0;
        const dbpassword = userExist && userExist[0].password;
        const isVerified = userExist && userExist[0].isVerified;
    
        // console.log(queryUserName_password);
        if(!userExist){
            return res.status(403).json({success:false, message:"user not exist"});
        }

        if(!isVerified){
            return res.status(403).json({success:false, message:"user not verified"});
        }

        const encrypted = await bcrypt.compare(password, dbpassword)

        if(encrypted !== dbpassword){
            return res.status(401).json({success:false, message:"Wrong email or password"});
        }

        const get_id_name_role_Byusername = await get_id_name_role_Byusername(username)
        const userId = get_id_name_role_Byusername[0]?.id;
        const name = get_id_name_role_Byusername[0]?.name;
        const role = get_id_name_role_Byusername[0]?.role;

        const userPayload = { userId: userId, name: name, role: role};
        generateTokenAndSetCookie(res,userPayload);
        console.log(userExist);
        
        
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}
