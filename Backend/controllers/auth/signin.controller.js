import bcrypt from 'bcrypt';
import {generateTokenAndSetCookie} from '../../utils/generateTokenAndSetCookie.js'
import {getUserName_by_Email, get_id_name_role_Byusername} from '../../models/auth/signin.model.js'

export const signin = async (req, res) =>{
    const {username, password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const usernameLower = username.toLowerCase();
        const queryUserName_password = await getUserName_by_Email(usernameLower);

        const userExist = queryUserName_password && queryUserName_password.length > 0;
        console.log(userExist);
        const dbpassword = userExist && queryUserName_password[0]?.password;
        const isVerified = userExist && queryUserName_password[0]?.isVerified;
        
        if(!userExist){
            return res.status(403).json({success:false, message:"user not exist"});
        }

        if(!isVerified){
            return res.status(403).json({success:false, message:"user not verified"});
        }

        const encrypted = await bcrypt.compare(password, dbpassword);

        if(!encrypted){
            return res.status(401).json({success:false, message:"Wrong email or password"});
        }

        const get_id_name_roleByusername = await get_id_name_role_Byusername(username);
        const userId = get_id_name_roleByusername[0]?.id;
        const name = get_id_name_roleByusername[0]?.name;
        const role = get_id_name_roleByusername[0]?.role;
        const userPayload = { userId: userId, name: name, role: role};

        generateTokenAndSetCookie(res,userPayload);
        res.status(200).json({success:true, message: "signed in successfully", user:userPayload})
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}
