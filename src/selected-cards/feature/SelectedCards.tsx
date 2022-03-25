import { Component, ReactNode } from "react";
import CardDeckComponent from "../../card-deck/feature/CardDeck";
import { CardDeck } from "../../types/card-deck";
import "./SelectedCards.scss";

export default class SelectedCards extends Component {
  props: {
    cards: CardDeck[];
    full: boolean;
    handleChoice: (choice: string) => void;
    round: number;
    maxRound: number;
    nextRound: () => void;
  };

  constructor(props: any) {
    super(props);
    this.props = props;
  }

  render(): ReactNode {
    const { cards, full } = this.props;
    return (
      <div className={"selected-cards" + (full ? " full" : "")}>
        {cards.map((cardDeck, i) => {
          const key = `selected-${i}`;
          return <CardDeckComponent key={key} {...cardDeck} turnable={full} />;
        })}
        {cards.length >= 2 && (
          <div className="selected-options">{this.getActionButtons(cards)}</div>
        )}
      </div>
    );
  }

  getActionButtons([card1, card2, card3]: CardDeck[]) {
    const round = this.props.round;
    if (!!card3) {
      return (
        <button className="btn btn-primary" onClick={this.props.nextRound}>
          {round === this.props.maxRound - 1 ? "End Game" : "Next Round"}
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
          onClick={() => this.props.handleChoice(choice)}
          key={key}
        >
          {choice}
        </button>
      );
    });
  }
}
