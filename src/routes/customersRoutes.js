import { Router } from 'express'
import { getAllCustomers, getCustomersById, postCustomer, putCustomer } from '../controllers/customersController.js'
import { validateCustomerSchema, validatePutCustomerSchema } from '../middlewares/customersMiddleware.js'

const customersRouters = Router()

customersRouters.get('/customers', getAllCustomers)
customersRouters.get('/customers/:id', getCustomersById)
customersRouters.post('/customers', validateCustomerSchema, postCustomer)
customersRouters.put('/customers/:id', validatePutCustomerSchema, putCustomer)

export default customersRouters