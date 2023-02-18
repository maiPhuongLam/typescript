import { API_URL } from "./config"
import { TDeck } from "./getDecks"

export const deleteCard = async (deckId: string, index: number): Promise<TDeck> => {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    return response.json()
}