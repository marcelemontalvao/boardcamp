import { Router } from 'express'
import { getGames, postGame } from '../controllers/gamesController.js'

const gamesRouters = Router()

gamesRouters.get('/games', getGames)
gamesRouters.post('/games',  postGame)

export default gamesRouters