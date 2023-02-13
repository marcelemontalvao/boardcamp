import { db } from "../configs/database.js";

async function getAllRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT
            rentals.*,
            customers.id AS "customer.id",
            customers.name AS "customer.name",
            games.id AS "game.id",
            games.name AS "game.name"
        FROM
            rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id;
      `);

        const transformedRentals = rentals.rows.map(rental => {
            return {
                ...rental,
                customer: {
                    id: rental["customer.id"],
                    name: rental["customer.name"]
                },
                game: {
                    id: rental["game.id"],
                    name: rental["game.name"]
                }
            };
        });

        res.send(transformedRentals);
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const gameExists = await db.query('SELECT * FROM games WHERE id = $1', [ gameId ]);
        
        const customerExists = await db.query(
            'SELECT * FROM customers WHERE id = $1',
            [customerId]
        );
        
        const openRentalsCount = await db.query(
            'SELECT COUNT(*) FROM rentals WHERE "gameId" = $1',
            [gameId]
        );
        
        const gameStock = await db.query(
            'SELECT "stockTotal" FROM games WHERE id = $1',
            [gameId]
        );
        
        if (gameExists.rowCount !== 1 || customerExists.rowCount !== 1 ) {
            return res.sendStatus(400);
        }
        
        if(gameStock.rows[0].stockTotal <= openRentalsCount.rows[0].count) {
            return res.sendStatus(400);
        }
        
        const rental = await db.query(`
            INSERT INTO rentals("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
            VALUES ($1, $2, $3, NOW(), (SELECT "pricePerDay" FROM games WHERE id = $2) * $3);
        `,
            [customerId, gameId, daysRented]
        );

        if (rental.rowCount === 1) {
            res.sendStatus(201);
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export { getAllRentals, postRental }