import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { createDeck } from './api/createDeck'
import { deleteDeck } from './api/deleteDeck'
import { getDecks } from './api/getDecks'
import { TDeck } from './api/getDecks'

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle('')
  }

  const handleDeleteDeck =async (deckId: string) => {
    deleteDeck(deckId)
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  useEffect(() => {
    const fetchDecks = async () => {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [decks])

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck title</label>
        <input 
          id='deck-title' 
          type="text" 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
