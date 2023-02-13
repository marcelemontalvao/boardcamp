import { rentalsSchemma } from "../schemas/rentalsSchema";
import { db } from "../configs/database";

async function validateRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const rental = {
        customerId,
        gameId,
        daysRented
    }

    const validation = rentalsSchemma.validate(rental, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    
    try {
        const existingGame = await db.query('SELECT * FROM games WHERE id = $1', [
            gameId,
        ]);
        
        if (existingGame.rowCount !== 1) {
            return res.sendStatus(400);
        }
    
        const existingCustomer = await db.query(
            'SELECT * FROM customers WHERE id = $1',
            [customerId]
        );

        if (existingCustomer.rowCount !== 1) {
            return res.sendStatus(400);
        }
    
        if (daysRented <= 0) {
            return res.sendStatus(400);
        }
        
      next();
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export { validateRental }