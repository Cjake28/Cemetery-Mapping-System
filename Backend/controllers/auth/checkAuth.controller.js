import { get_id_name_role_ByID } from '../../models/auth/checkAuth.model.js';

export const checkAuth = async (req, res) => {
	console.log('repete');
	try {
		const userId = req.userId;

		if (!userId) {
			return res.status(400).json({ success: false, message: "User ID not provided" });
		}

		const userDetails = await get_id_name_role_ByID(userId);

		if (!userDetails || userDetails.length === 0) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		const user = {
			userId: userDetails[0]?.id,
			name: userDetails[0]?.name,
			role: userDetails[0]?.role
		};

		// Send response with user details
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
