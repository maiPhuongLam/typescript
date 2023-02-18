import { config } from 'dotenv'
config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Deck from './models/Deck'
import { getDecksController } from './controllers/getDecksCotroller'
import { deleteDeckController } from './controllers/deleteDeckController'
import { createDeckController } from './controllers/createDeckController'
import { createCardController } from './controllers/createCardController'
import { getDeckController } from './controllers/getDeckController'
import { deleteCardController } from './controllers/deleteCardController'
const app = express()
const PORT = 5000

app.use(cors({
    origin: '*'
}))
app.use(express.json()) 

app.get('/decks', getDecksController)
app.post('/decks', createDeckController)
app.delete('/decks/:deckId', deleteDeckController)
app.post('/decks/:deckId/cards', createCardController)
app.get('/decks/:deckId', getDeckController)
app.delete('/decks/:deckId/cards/:index', deleteCardController)

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        app.listen(5000, () => {
            console.log('SERVER IS RUNNING ON PORT: ' + PORT);
        })
    })
