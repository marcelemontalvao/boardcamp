import { Router } from 'express'
import { getAllRentals, postRental } from '../controllers/rentalsController.js'

const rentalsRouters = Router()

rentalsRouters.get('/rentals', getAllRentals)
rentalsRouters.post('/rentals',  postRental)

export {rentalsRouters} 