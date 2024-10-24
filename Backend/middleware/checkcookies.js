import jwt from "jsonwebtoken";

export const checkCookies = async(req, res) =>{
    const token = req.cookies?.HimlayanToken || req.headers['authorization'];
    console.log("checkcokkies", token);
    res.status(200).json({token:token});
}