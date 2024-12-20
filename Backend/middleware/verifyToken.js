import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.HimlayanToken;
	 
	if (!token){
		return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	}
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded){
			return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		}

		req.userId = decoded.userId;
		req.role = decoded.role;
		req.name = decoded.name;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};