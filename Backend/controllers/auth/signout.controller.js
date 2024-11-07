export async function signout(req, res){
	res.clearCookie("HimlayanToken", { path: '/' });
	res.status(200).json({ success: true, message: "Signed out successfully" });
};