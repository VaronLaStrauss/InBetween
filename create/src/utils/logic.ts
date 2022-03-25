import { CardDeck } from "../types/card-deck";
import { getCardFromDeck } from "./get-deck";

export function playCard(deck: Map<string, number[]>): CardDeck {
  const card = getCardFromDeck(deck);
  const list = deck.get(card.suit)!.filter((val) => {
    return val !== card.cardNumber;
  });
  if (list.length === 0) {
    deck.delete(card.suit);
  } else {
    deck.set(card.suit, list);
  }

  return card;
}
