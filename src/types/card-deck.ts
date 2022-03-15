export type CardDeck = {
  suit: string;
  cardNumber: number;
  locations: number[] | { name: string; src: string };
};
