import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { createDeck } from '../api/createDeck'
import { deleteDeck } from '../api/deleteDeck'
import { getDecks } from '../api/getDecks'
import { getDeck } from '../api/getDeck'

import { TDeck } from '../api/getDecks'
import { createCard } from '../api/createCard'
import { deleteCard } from '../api/deleteCard'
function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<string[]>([])
  const [text, setText] = useState('')
  const { deckId } = useParams()
  console.log(deckId);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const { cards: serverCards } = await createCard(deckId!,text)
    setCards(serverCards)
    setText('')
  }

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    const fetchDecks = async () => {
      if (!deckId) return;
      const newDeck = await getDeck(deckId)
      setDeck(newDeck)
      setCards(newDeck.cards)
    }
    fetchDecks()
  }, [deckId])

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Card Text</label>
        <input 
          id='card-text' 
          type="text" 
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}

export default Deck