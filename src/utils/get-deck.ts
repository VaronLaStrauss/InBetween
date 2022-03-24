import { CardDeck } from "../types/card-deck";
import SUITE_LIST from "./suite-list";
import { SUIT_LOCATIONS } from "./suite-location";

export function getCardFromDeck(deck: Map<string, number[]>): CardDeck {
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

export function shuffleDeck(deck: Map<string, number[]>): CardDeck[] {
  const copiedDeck = copyDeck(deck);

  const cards: CardDeck[] = [];
  while (copiedDeck.size > 0) {
    const card = getCardFromDeck(copiedDeck);
    cards.push(card);
    copiedDeck
      .get(card.suit)!
      .splice(copiedDeck.get(card.suit)!.indexOf(card.cardNumber), 1);
    if (copiedDeck.get(card.suit)!.length === 0) {
      copiedDeck.delete(card.suit);
    }
  }

  return cards;
}

export function getNewDeck(): Map<string, number[]> {
  return new Map(
    SUITE_LIST.map((suite) => {
      return [suite, Array.from({ length: 13 }, (_, i) => i + 1)];
    })
  );
}

export function copyDeck(deck: Map<string, number[]>) {
  const newDeck = new Map<string, number[]>();
  for (const [suit, numbers] of deck) {
    newDeck.set(suit, [...numbers]);
  }
  return newDeck;
}
