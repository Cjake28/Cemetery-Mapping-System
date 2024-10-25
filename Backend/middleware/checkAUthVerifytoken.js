import jwt from "jsonwebtoken";

export const checkAuth_VerifyToken = (req, res, next) => {
	console.log("checkAuth_VerifyToken", req.headers['authorization']);
	const token = req.cookies.HimlayanToken || req.headers['authorization'];
	 console.log("checkAuth_VerifyToken", token);
	 
	if (!token){
		console.log('checkAuth: No token');
		return res.status(200).json({ success: false, message: "No token" });
	}
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded){
			console.log('checkAuth: invalid Token');
			return res.status(200).json({ success: false, message: "Invalid token" });
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