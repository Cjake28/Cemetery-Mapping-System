


export async function Get_all_person(req, res) {
    try {
        // Fetch all users from the database
        const users = await Get_all_personDB();

        // Return the result
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error Get all person:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching persons" });
    }
}
