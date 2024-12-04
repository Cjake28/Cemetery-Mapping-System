import {admin_counts_model, 
        user_counts_model, 
        burials_by_month_model,
        least_burials_month_model,
        average_burials_month_model,
        countAllOcupiedLots,
        countAllVacantLots
        } from '../../models/admin/dashboard.model.js';



export async function admin_counts(req, res) {
    try {
        const adminCounts = await admin_counts_model();

        res.status(200).json({
            success: true,
            adminCounts
        });
    }catch(error) {
        console.error("Error in admin_counts:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching admin_counts from the database',
        });
    }
}

export async function user_counts(req, res) {
    try {
        const userCounts = await user_counts_model();

        res.status(200).json({
            success: true,
            userCounts
        });
    }catch(error) {
        console.error("Error in userCounts:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching userCounts from the database',
        });
    }
}

export async function fetch_burial_metrics(req, res) {
    const { year } = req.query;

    if (!year) {
        return res.status(400).json({
            success: false,
            message: "Year parameter is required",
        });
    }

    try {
        const monthlyBurials = await burials_by_month_model(year) || [];
        const leastBurialsMonth = await least_burials_month_model(year) || null;
        const averageBurials = await average_burials_month_model(year) || 0;

        res.status(200).json({
            success: true,
            data: {
                monthlyBurials,
                leastBurialsMonth,
                averageBurials,
            },
        });
    } catch (error) {
        console.error("Error in fetch_burial_metrics:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching burial metrics",
        });
    }
}

export async function getOcupied_vacantlots(req, res) {
    try {
        // Fetch the counts using the provided models
        const occupiedLots  = await countAllOcupiedLots();
        const vacantLots  = await countAllVacantLots();
        const totalLots = 2346; // Total lots, hardcoded or fetched from DB
        const noData = Math.max(totalLots - (occupiedLots + vacantLots), 0);

        // Check for no data scenario
        if (occupiedLots === 0 && vacantLots === 0) {
            return res.status(200).json({
                success: true,
                message: "No data available for occupied and vacant lots.",
                data: {
                    occupiedLots: 0,
                    vacantLots: 0,
                    noData: 0,
                },
            });
        }

        // Respond with the counts
        res.status(200).json({
            success: true,
            data: {
                occupiedLots,
                vacantLots,
                noData,
            },
        });

    } catch (error) {
        console.error("Error in getOcupied_vacantlots:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching occupied and vacant lots counts.",
        });
    }
}

