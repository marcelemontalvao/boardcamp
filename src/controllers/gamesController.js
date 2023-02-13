import { db } from "../configs/database.js";

async function getGames(req, res) {
    try {
      const games = await db.query("SELECT * FROM games");
      res.send(games.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
}

async function postGame(req, res) {
    try {
        const { name, image, stockTotal, pricePerDay } = req.body

        if(!name || stockTotal <= 0 || pricePerDay <= 0) {
            return res.status(400).send()
        }

        const nameQuery = `SELECT name FROM games WHERE name = $1;`
        const queryResult = await db.query(nameQuery, [name])

        if(queryResult.rowCount >= 1) {
            return res.status(409).json({
                message: "Game already exists."
            })
        }

        await db.query(
            `
            INSERT INTO 
                games (name, image, "stockTotal", "pricePerDay")
            VALUES 
                ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay])

        return res.status(201).send()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export { getGames, postGame }