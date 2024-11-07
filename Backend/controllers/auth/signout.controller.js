export async function signout(req, res) {
    res.cookie("HimlayanToken", "", { 
        httpOnly: true,
        secure: ture, // Ensure it's only secure in production
        sameSite: "None", // SameSite=None to allow cross-origin
        expires: new Date(0) // Set expiration to a date in the past
    });
    res.status(200).json({ success: true, message: "Signed out successfully" });
};