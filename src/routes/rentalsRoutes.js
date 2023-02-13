import { Router } from 'express'
import { getAllRentals, postRental } from '../controllers/rentalsController.js'
import { validateRental } from '../middlewares/rentalsMiddleware.js'

const rentalsRouters = Router()

rentalsRouters.get('/rentals', getAllRentals)
rentalsRouters.post('/rentals', validateRental, postRental)

export { rentalsRouters } 