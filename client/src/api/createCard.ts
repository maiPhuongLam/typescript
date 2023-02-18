import { TDeck } from "./getDecks"
import { API_URL } from './config'

export const createCard = async (deckId: string, text: string): Promise<TDeck> => {
    const respone = await fetch(`${API_URL}/decks/${deckId}/cards`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        text,
      })
    })
    return respone.json()
}