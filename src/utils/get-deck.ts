import { CardDeck } from "../types/card-deck";
import { SUIT_LOCATIONS } from "./suite-location";

export default function getCardFromDeck(deck: Map<string, number[]>): CardDeck {
  const keys = Array.from(deck.keys());
  const randomVal = Math.floor(Math.random() * keys.length);
  const suit = keys[randomVal];
  const suitNumbers = deck.get(suit)!;

  const cardNumber =
    suitNumbers[Math.floor(Math.random() * suitNumbers.length)];
  const locations = SUIT_LOCATIONS[cardNumber];

  return {
    suit,
    cardNumber,
    locations,
  };
}
