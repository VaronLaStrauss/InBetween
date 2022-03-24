import { Component, ReactNode } from "react";
import "./App.bak.scss";
import CardDeckComponent from "./card-deck/feature/CardDeck";
import { CardDeck } from "./types/card-deck";
import CARD_LIST from "./utils/card-list";
import getCardFromDeck from "./utils/get-deck";

class App extends Component {
  availableCards = new Map([...CARD_LIST]);
  state: {
    score: number;
    round: number;
    card1: CardDeck | null;
    card2: CardDeck | null;
    card3: CardDeck | null;
  } = {
    score: 0,
    round: 0,
    card3: null,
    card1: this.playCard,
    card2: this.playCard,
  };

  render(): ReactNode {
    const startButton = (
      <button className="btn btn-primary" onClick={this.startGame.bind(this)}>
        Start Game
      </button>
    );
    if (this.state.round === 0) {
      return startButton;
    } else if (this.state.round === 6) {
      return (
        <div className="App">
          <h1>
            Game Over!
            <br />
            Score: {this.state.score}
          </h1>
          {startButton}
        </div>
      );
    }

    return (
      <>
        <div>
          <h1>Score: {this.state.score}</h1>
          <h2>Round: {this.state.round}</h2>
        </div>
        <div>
          <CardDeckComponent {...this.state.card1} />
          <CardDeckComponent {...this.state.card2} />
          {!!this.state.card3 && <CardDeckComponent {...this.state.card3} />}
        </div>
        <div>{this.getActionButtons(this.state.card1, this.state.card2)}</div>
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

  nextRound() {
    this.setState({
      ...this.state,
      round: this.state.round + 1,
      card3: null,
      card1: this.playCard,
      card2: this.playCard,
    });
  }

  getActionButtons(card1: CardDeck, card2: CardDeck) {
    if (!!this.state.card3) {
      return (
        <button className="btn btn-primary" onClick={this.nextRound.bind(this)}>
          {this.state.round === 5 ? "End Game" : "Next Round"}
        </button>
      );
    }

    const choices = ["No Deal"];
    card1.cardNumber === card2.cardNumber
      ? choices.push("Higher", "Lower")
      : choices.push("Deal");

    return choices.map((choice, i) => {
      const key = `${choice}-${i}`;
      return (
        <button
          className="btn btn-primary"
          onClick={this.handleChoice.bind(this, choice, card1, card2)}
          key={key}
        >
          {choice}
        </button>
      );
    });
  }

  handleChoice(choice: string) {
    const card3 = this.playCard;
    const state = { ...this.state, card3 };
    if (choice === "No Deal") {
      return this.setState({ ...state, score: this.state.score - 0.5 });
    }

    if (card1.cardNumber === card2.cardNumber) {
      if (
        (card3.cardNumber > card1.cardNumber && choice === "Higher") ||
        (card3.cardNumber < card1.cardNumber && choice === "Lower")
      ) {
        return this.setState({ ...state, score: this.state.score + 1 });
      } else {
        return this.setState({ ...state, score: this.state.score - 1 });
      }
    }

    const min = Math.min(card1.cardNumber, card2.cardNumber);
    const max = Math.max(card1.cardNumber, card2.cardNumber);
    if (card3.cardNumber > min && card3.cardNumber < max && choice === "Deal") {
      return this.setState({ ...state, score: this.state.score + 1 });
    } else {
      return this.setState({ ...state, score: this.state.score - 1 });
    }
  }

  get playCard(): CardDeck {
    const card = getCardFromDeck(this.availableCards);
    const list = this.availableCards.get(card.suit)!.filter((val) => {
      return val !== card.cardNumber;
    });
    if (list.length === 0) {
      this.availableCards.delete(card.suit);
    } else {
      this.availableCards.set(card.suit, list);
    }

    return card;
  }
}

export default App;
