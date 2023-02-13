import { db } from "../configs/database.js";

async function getAllRentals( req, res) {
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
  
export { getAllRentals }