import { db } from "../configs/database.js";
import customersSchema from "../schemas/custumersSchema.js";

export async function validateCustomerSchema(req, res, next) {
    const { name, phone, cpf, birthday } = req.body
    
    const cpfQuery = `SELECT cpf FROM customers WHERE cpf = $1;`
    const queryResult = await db.query(cpfQuery, [cpf])

    if(queryResult.rowCount >= 1) {
        return res.status(409).json({
            message: "Customer already exists."
        })
    }
    
    const customer = { name, phone, cpf, birthday }
   
    const validation = customersSchema.validate(customer, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    next();
}

export async function validatePutCustomerSchema(req, res, next) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params
    
    const cpfQuery = `SELECT cpf FROM customers WHERE cpf = $1 AND id != $2;`
    const queryResult = await db.query(cpfQuery, [cpf, id])

    if(queryResult.rowCount >= 1) {
        return res.status(409).json({
            message: "Customer already exists."
        })
    }
    
    const customer = { name, phone, cpf, birthday }
   
    const validation = customersSchema.validate(customer, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    next();
}