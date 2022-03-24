import { Component, ReactNode } from "react";
import "./App.scss";
import bg from "./assets/background/table-carpet.png";
import CardDeckComponent from "./card-deck/feature/CardDeck";
import Instructions from "./instructions/feature/Instructions";
import SelectedCards from "./selected-cards/feature/SelectedCards";
import { CardDeck } from "./types/card-deck";
import { getNewDeck, shuffleDeck } from "./utils/get-deck";

export default class App extends Component {
  shuffledDeck!: CardDeck[];
  usedCards!: Set<number>;
  unusedCards!: Set<number>;

  state = {
    round: 0,
    score: 0,
    selectedCards: [] as CardDeck[],
    maxRounds: 0,
    endGame: false,
  };

  constructor(props: any) {
    super(props);
    this.resetCounters();
  }

  render(): ReactNode {
    if (this.state.maxRounds > 0) {
      let turnable = false;
      return (
        <div
          style={{
            backgroundImage: `url(${bg})`,
          }}
          className="App"
        >
          <div className="cards-container">
            {this.shuffledDeck.map((cardDeck, i) => {
              const key = `field-card-${i}`;

              return (
                <CardDeckComponent
                  key={key}
                  {...cardDeck}
                  turnable={turnable}
                  clickCard={this.clickCard.bind(this, cardDeck, i)}
                  selected={this.usedCards.has(i)}
                />
              );
            })}
          </div>
          <SelectedCards
            full={this.state.selectedCards.length > 1}
            cards={this.state.selectedCards}
            handleChoice={this.handleChoice.bind(this)}
            round={this.state.round}
            nextRound={this.nextRound.bind(this)}
          />
        </div>
      );
    }

    if (this.state.endGame) {
      return (
        <div className="App">
          <div className="end-game">
            <h1>Game Over</h1>
            <h2>Your score: {this.state.score}</h2>
            <button
              className="btn btn-primary"
              onClick={this.startGame.bind(this, 0)}
            >
              Restart
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <Instructions start={this.startGame.bind(this)} />
      </>
    );
  }

  startGame(rounds: number) {
    this.resetCounters();
    this.setState({
      round: 0,
      score: 0,
      selectedCards: [] as CardDeck[],
      endGame: false,
      maxRounds: rounds,
    });
  }

  resetCounters() {
    this.shuffledDeck = shuffleDeck(getNewDeck());
    this.usedCards = new Set<number>();
    this.unusedCards = new Set<number>(this.shuffledDeck.map((_, i) => i));
  }

  nextRound() {
    if (this.state.maxRounds - 1 === this.state.round) {
      return this.setState({
        ...this.state,
        round: 0,
        selectedCards: [] as CardDeck[],
        maxRounds: 0,
        endGame: true,
      });
    }

    this.setState({
      ...this.state,
      round: this.state.round + 1,
      selectedCards: [] as CardDeck[],
    });
  }

  clickCard(card: CardDeck, i: number) {
    if (this.usedCards.has(i) || this.state.selectedCards.length >= 2) return;
    this.usedCards.add(i);
    this.unusedCards.delete(i);

    this.setState({
      ...this.state,
      selectedCards: [...this.state.selectedCards, card],
    });
  }

  handleChoice(choice: string) {
    const [card1, card2] = this.state.selectedCards;
    const card3 = this.playCard;

    const cards = [card1, card2, card3];

    if (choice === "No Deal") {
      return this.setState({
        ...this.state,
        score: this.state.score - 0.5,
        selectedCards: cards,
      });
    }

    if (card1.cardNumber === card2.cardNumber) {
      if (
        (card3.cardNumber > card1.cardNumber && choice === "Higher") ||
        (card3.cardNumber < card1.cardNumber && choice === "Lower")
      ) {
        return this.setState({
          ...this.state,
          score: this.state.score + 1,
          selectedCards: cards,
        });
      } else {
        return this.setState({
          ...this.state,
          score: this.state.score - 1,
          selectedCards: cards,
        });
      }
    }

    const min = Math.min(card1.cardNumber, card2.cardNumber);
    const max = Math.max(card1.cardNumber, card2.cardNumber);
    if (card3.cardNumber > min && card3.cardNumber < max && choice === "Deal") {
      return this.setState({
        ...this.state,
        score: this.state.score + 1,
        selectedCards: cards,
      });
    } else {
      return this.setState({
        ...this.state,
        score: this.state.score - 1,
        selectedCards: cards,
      });
    }
  }

  get playCard(): CardDeck {
    const i = Array.from(this.unusedCards)[
      Math.floor(Math.random() * this.unusedCards.size)
    ];
    this.usedCards.add(i);
    this.unusedCards.delete(i);
    return this.shuffledDeck[i];
  }
}
