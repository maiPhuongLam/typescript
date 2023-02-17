import { TDeck } from "./getDecks"
import { API_URL } from './config'

export const createDeck = async (title: string): Promise<TDeck> => {
    const respone = await fetch(`${API_URL}/decks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      })
    })
    return respone.json()
}