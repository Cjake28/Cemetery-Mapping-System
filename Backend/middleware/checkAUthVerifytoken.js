import jwt from "jsonwebtoken";

export const checkAuth_VerifyToken = (req, res, next) => {    
    const token = req.cookies.HimlayanToken || req.headers['authorization']?.split(" ")[1];
    console.log("Token to verify:", token);

    if (!token) {
        console.log('checkAuth: No token');
        return res.status(200).json({ success: false, message: "No token" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            console.log('checkAuth: Invalid token');
            return res.status(200).json({ success: false, message: "Invalid token" });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        req.name = decoded.name;
        next();
    } catch (error) {
        console.log("Error in verifyToken:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
