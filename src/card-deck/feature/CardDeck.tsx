import { Component, ReactNode } from "react";
import { CardDeck } from "../../types/card-deck";
import { SUITE_LOGOS } from "../../utils/suite-list";
import { CARD_BACK } from "../../utils/suite-location";
import "./CardDeck.scss";

export default class CardDeckComponent extends Component {
  props: CardDeck & {
    turnable: boolean;
    clickCard?: (card: CardDeck) => void;
    selected?: boolean;
  };

  constructor(props: any) {
    super(props);
    this.props = props;
  }

  render(): ReactNode {
    const { cardNumber, locations, suit, turnable, clickCard, selected } =
      this.props;
    const cardSymbol =
      cardNumber === 1
        ? "A"
        : cardNumber === 11
        ? "J"
        : cardNumber === 12
        ? "Q"
        : cardNumber === 13
        ? "K"
        : cardNumber;
    const red = suit === "hearts" || suit === "diamonds" ? "red" : "";

    return (
      <div
        className={
          "playing-card" +
          (turnable ? " hoverable" : " expandable") +
          (selected === true ? " selected" : "")
        }
        onClick={() => {
          if (!!clickCard) clickCard({ cardNumber, locations, suit });
        }}
      >
        <div className="card-inner">
          <div className="card-back">
            <img src={CARD_BACK} alt="the back of the deck of cards" />
          </div>
          <div className="card-front">
            {turnable && (
              <>
                <div className="suit-container">
                  <div className={"symbol top-left " + red}>
                    <span>{cardSymbol}</span>
                    <img src={SUITE_LOGOS[suit]} alt="the suite of the card" />
                  </div>
                </div>

                <div className="suits">
                  {this.getSuitLocations(suit, locations)}
                </div>

                <div className="suit-container">
                  <div className={"symbol bottom-right " + red}>
                    <span>{cardSymbol}</span>
                    <img src={SUITE_LOGOS[suit]} alt="the suite of the card" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  getSuitLocations(
    suit: string,
    locations: number[] | { name: string; src: string }
  ) {
    if (locations instanceof Array) {
      return locations.map((columnLength, i) => {
        const key = `${suit}-${i}`;
        return (
          <div className="suit-column" key={key}>
            {Array.from({ length: columnLength }).map((_, j) => {
              const key = `${suit}-${i}-${j}`;
              return (
                <div key={key}>
                  <img src={SUITE_LOGOS[suit]} alt="the suite of the card" />
                </div>
              );
            })}
          </div>
        );
      });
    }

    const red = suit === "hearts" || suit === "diamonds" ? "red" : "";
    return (
      <div className="suit-column">
        <img src={locations.src} className={red} />
      </div>
    );
  }
}
