import { db } from "../configs/database.js";

async function getAllRentals(req, res) {
    try {
        const rentals = await db.query("SELECT * FROM rentals");
        res.send(rentals.rows);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export { getAllRentals }