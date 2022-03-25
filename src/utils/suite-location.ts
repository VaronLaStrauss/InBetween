import jack from "../assets/card/symbols/jack-symbol.png";
import queen from "../assets/card/symbols/queen-crown.png";
import king from "../assets/card/symbols/king-crown.png";
import cardBack from "../assets/card/card-back.png";

export const SUIT_LOCATIONS: {
  [length: number]: number[] | { name: string; src: string };
} = {
  1: [1],
  2: [2],
  3: [3],
  4: [2, 2],
  5: [2, 1, 2],
  6: [3, 3],
  7: [3, 1, 3],
  8: [3, 2, 3],
  9: [4, 1, 4],
  10: [4, 2, 4],
  11: {
    name: "Jack",
    src: jack,
  },
  12: {
    name: "Queen",
    src: queen,
  },
  13: {
    name: "King",
    src: king,
  },
};

export const CARD_BACK = cardBack;
