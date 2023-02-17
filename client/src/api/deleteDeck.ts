import { API_URL } from "./config"
import { TDeck } from "./getDecks"

export const deleteDeck = async (deckId: string): Promise<TDeck> => {
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    return response.json()
}