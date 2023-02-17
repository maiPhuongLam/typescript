import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

type TDeck = {
  _id: string
  title: string
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('http://localhost:5000/decks', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      })
    })
    setTitle('')
  }

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await fetch('http://localhost:5000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
        ))}
      </div>
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
