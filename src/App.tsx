import { Component, ReactNode } from "react";
import "./App.css";
import CardDeckComponent from "./card-deck/feature/CardDeck";
import { CardDeck } from "./types/card-deck";
import CARD_LIST from "./utils/card-list";
import getCardFromDeck from "./utils/get-deck";

import Button from '@mui/material/Button';
import Router from 'react-router';

class App extends Component {
  availableCards = new Map([...CARD_LIST]);
  state = {
    score: 0,
    round: 0,
    card3: null,
    card1: this.playCard,
    card2: this.playCard,
  };

  render(): ReactNode {
    const startButton = (
      <div className="containerMainMenu">
        <div className="contentMainMenu">
          <h1 className="gameTitle">
            In Between by Wall•E Bayola
          </h1>
          <div className="containerChoices">
            <button className="btn btn-primary" onClick={this.startGame.bind(this)}>
              Start Game
            </button>
            <button className="btn btn-primary">
              How to play?
            </button>
            {/* <Button href="./pages/howtoplay" variant="contained">
              How to play?
            </Button> */}
          </div>

          <div className="htpMainMenu">
            <table>
              <tr>
                <h4>
                  Developers
                </h4>
              </tr>
              <tr>
                <td className="viany">
                </td>
                <td className="pogs">
                </td>
              </tr>
              <tr>
                <th>Lead Developer: Viany Manuel</th>
                <th></th>
                <th>Developer: Sean Serafin</th>
              </tr>
              <tr>
                <th>Rules:</th>
              </tr>
              <tr>
                <td>I.  There are five rounds every game.</td>
              </tr>
              <tr>
                <td>II. Every round, the game will randomly generate two cards (from Ace to Kings including Jacks)</td>
              </tr>
              <tr>
                <td>III.  The player must choose one of the two options (“Deal” or “No Deal) after the two cards are revealed.</td>
              </tr>
              <tr>
                <td>IV.  The third card will only be shown if the player has selected one of the two options.</td>
              </tr>
              <tr>
                <td>V.  If the player wins the round, a point will be added to the total score.</td>
              </tr>
              <tr>
                <td>VI.  If the player loses the round, a point will be deducted from the total score.</td>
              </tr>
              <tr>
                <td>VII.  If the player chose “No Deal”, half a pont will be deducted from the total score.</td>
              </tr>
              <tr>
                <td>IX.  If the two randomized numbers are identical, the player has the option to choose between HIGHER or LOWER.</td>
              </tr>
              <tr>
                <td>X.  If the user chose HIGHER - the player  WINS the game if the THIRD number is higher than the first two identical drawn numbers. Otherwise, the player LOSES.</td>
              </tr>
              <tr>
                <td>XI.  If the user chose LOWER- the player WINS the game if the THIRD number is higher than the first two identical drawn cards. Otherwise, the player LOSES.</td>
              </tr>
              <tr>
                <td>XII.  If the third randomized number is the same as the first two numbers, it is considered as a loss.</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
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
        <div className="inGameBackGround">

          <div className="statusContainer">
            <div className="inGameStatus">
              <h1>Score: {this.state.score}</h1>
              <h2>Round: {this.state.round}</h2>
            </div>
          </div>

          <div className="inGameComponents">
            <CardDeckComponent {...this.state.card1} />
            <CardDeckComponent {...this.state.card2} />
            {!!this.state.card3 && <CardDeckComponent {...this.state.card3} />}
          </div>

          <div className="inGameActionBtns">{this.getActionButtons(this.state.card1, this.state.card2)}</div>
        </div>
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

  handleChoice(choice: string, card1: CardDeck, card2: CardDeck) {
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
