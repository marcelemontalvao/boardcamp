import { db } from "../configs/database.js";

async function getAllCustomers(req, res) {
    try {
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getCustomersById(req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM customers WHERE id = $1;`
    const queryResult = await db.query(query, [id])

    if(queryResult.rowCount === 0){
        return res.status(404).json({
            message: 'Customer not found!'
        })
    }

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        res.send(customer.rows[0]);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function postCustomer(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.body

        const customerData = {
            name,
            phone,
            cpf,
            birthday,
        }

        const query = ` 
            INSERT INTO 
                customers(name, phone, cpf, birthday)
            VALUES
                ($1, $2, $3, $4)
            RETURNING *;
        `

        let queryConfig = {
            text: query,
            values: Object.values(customerData)
        }

        const customer = await db.query(queryConfig)
        res.locals.customer = customer
        return res.status(201).send()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function putCustomer(req, res) {
    const id = req.params.id
    const query = `SELECT * FROM customers WHERE id = $1;`
    const queryResult = await db.query(query, [id])
    const { name, phone, cpf, birthday } = req.body

    try {
      await db.query(
        "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id = $5",
        [name, phone, cpf, birthday, id]
      );
  
      res.status(200).send()
    } catch (error) {
      res.status(500).send(error.message)
    }
}

export { getAllCustomers, getCustomersById, postCustomer, putCustomer }