import { Component, ReactNode } from "react";
import "./App.css";
import CardDeckComponent from "./card-deck/feature/CardDeck";
import { CardDeck } from "./types/card-deck";
import CARD_LIST from "./utils/card-list";
import getCardFromDeck from "./utils/get-deck";

class App extends Component {
  availableCards = new Map([...CARD_LIST]);
  state = {
    score: 0,
    round: 0,
  };

  render(): ReactNode {
    const [card1, card2] = this.playCards;

    return (
      <>
        <div>
          <h1>Score: {this.state.score}</h1>
          <h2>Round: {this.state.round}</h2>
        </div>
        <div>
          <CardDeckComponent {...card1} />
          <CardDeckComponent {...card2} />
        </div>
        <button className="btn btn-primary">Start Game</button>
      </>
    );
  }

  startGame() {
    this.availableCards = new Map([...CARD_LIST]);
    this.setState({
      score: 0,
      round: 1,
    });
  }

  get playCards(): [CardDeck, CardDeck] {
    const card1 = getCardFromDeck(this.availableCards);
    const list = this.availableCards.get(card1.suit)!.filter((val) => {
      return val !== card1.cardNumber;
    });
    if (list.length === 0) {
      this.availableCards.delete(card1.suit);
    } else {
      this.availableCards.set(card1.suit, list);
    }

    const card2 = getCardFromDeck(this.availableCards);
    const list2 = this.availableCards.get(card2.suit)!.filter((val) => {
      return val !== card2.cardNumber;
    });
    if (list2.length === 0) {
      this.availableCards.delete(card2.suit);
    } else {
      this.availableCards.set(card2.suit, list2);
    }

    return [card1, card2];
  }
}

export default App;
