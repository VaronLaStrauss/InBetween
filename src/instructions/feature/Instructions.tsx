import { BaseSyntheticEvent, Component, ReactNode } from "react";
import "./Instructions.scss";

export default class Instructions extends Component {
  rounds = 5;
  props: { start: (rounds: number) => void };

  constructor(props: any) {
    super(props);
    this.props = props;
  }

  render(): ReactNode {
    return (
      <div className="instructions">
        <div className="contentMainMenu">
          <h1 className="gameTitle">
            In Between
          </h1>

          <div className="containerChoices">
            
            <div className="rule">
              The game usually has only about five (5) rounds of play, but this
              application will allow you to choose among 5, 10, or 17 rounds.
            </div>
            <div className="rule">
              Normally, the game would automatically and randomly draw two (2) cards
              from the deck, but this application allows you to choose the cards
              from the playing field.
            </div>
            <div className="rule">
              After drawing two (2) cards, you will choose an option depending on
              the cards you've chosen. After the choice has been selected, a third
              card will be drawn at random from the playing field. Depending on the
              cards you've chosen, you will either win or lose based on the
              numerical value of the third card compared against the numerical value
              of the first and second cards.
            </div>
            <div className="rule">
              If: (1) the cards are not identical, (2) you chose the option{" "}
              <b>&nbsp;DEAL</b>, and (3) the third card's value is in between the
              two cards' values, you will get a point. Alternatively, you will lose
              a point.
            </div>
            <div className="rule">
              If: (1) the cards are identical, (2) you chose the option{" "}
              <b>&nbsp;HIGHER&nbsp;</b> or <b>&nbsp;LOWER</b>, and (3) the third
              card's value is higher/lower, respectively, than the two cards'
              values, you will get a point. Alternatively, you will lose a point.
            </div>
            <div className="rule">
              Ultimately, if you chose the option <b>&nbsp;NO DEAL</b>, you will
              lose half a point.
            </div>
            <div className="rule">
              <label htmlFor="rounds">Please select the number of rounds</label>
              <select name="rounds" onChange={this.handleSelect.bind(this)}>
                <option value="5">5 Rounds</option>
                <option value="10">10 Rounds</option>
                <option value="17">17 Rounds</option>
              </select>
            </div>

          </div>

        </div>

        <div
          className="start"
          onClick={() => {
            this.props.start(this.rounds);
          }}
        >
          <button>Start</button>
        </div>
      </div>
    );
  }

  handleSelect(event: BaseSyntheticEvent) {
    this.rounds = parseInt(event.target.value);
  }
}
