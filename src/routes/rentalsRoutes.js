import { Router } from 'express'
import { deleteRental, getAllRentals, postRental } from '../controllers/rentalsController.js'
import { validateRental } from '../middlewares/rentalsMiddleware.js'

const rentalsRouters = Router()

rentalsRouters.get('/rentals', getAllRentals)
rentalsRouters.post('/rentals', validateRental, postRental)
rentalsRouters.delete('/rentals/:id', validateRental, deleteRental)

export { rentalsRouters } 