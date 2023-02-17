import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import Deck from './models/Deck'
const app = express()
const PORT = 5000

app.use(express.json())

app.post('/decks', async (req, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createDeck = await newDeck.save()
    res.json(createDeck)
})

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://maiphuonglambh2002:mpl08092002@typescript.otpncqa.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000, () => {
            console.log('SERVER IS RUNNING ON PORT: ' + PORT);
        })
    })
