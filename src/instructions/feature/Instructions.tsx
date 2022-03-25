import { BaseSyntheticEvent, Component, ReactNode } from "react";
import "./Instructions.scss";
import dealer from "../../assets/background/dealer.png";
import redCarpet from "../../assets/background/red-carpet.jpg";

export default class Instructions extends Component {
  rounds = 5;
  props: { start: (rounds: number) => void };

  constructor(props: any) {
    super(props);
    this.props = props;
  }

  render(): ReactNode {
    return (
      <div
        className="instructions"
        style={{ backgroundImage: `url("${redCarpet}")` }}
      >
        <div
          className="contentMainMenu"
          style={{ backgroundImage: `url("${dealer}")` }}
        >
          <div className="backdrop">
            <h1 className="gameTitle">In Between</h1>
            <ul className="containerChoices">
              <li className="rule">
                The game usually has only about five (5) rounds of play, but
                this application will allow you to choose among 5, 10, or 17
                rounds.
              </li>
              <li className="rule">
                Normally, the game would automatically and randomly draw two (2)
                cards from the deck, but this application allows you to choose
                the cards from the playing field.
              </li>
              <li className="rule">
                After drawing two (2) cards, you will choose an option depending
                on the cards you've chosen. After the choice has been selected,
                a third card will be drawn at random from the playing field.
                Depending on the cards you've chosen, you will either win or
                lose based on the numerical value of the third card compared
                against the numerical value of the first and second cards.
              </li>
              <li className="rule">
                <span>
                  If: (1) the cards are not identical, (2) you chose the option
                  <b>&nbsp;DEAL</b>, and (3) the third card's value is in
                  between the two cards' values, you will get a point.
                  Alternatively, you will lose a point.
                </span>
              </li>
              <li className="rule">
                <span>
                  If: (1) the cards are identical, (2) you chose the option
                  <b>&nbsp;HIGHER</b> or <b>&nbsp;LOWER</b>, and (3) the third
                  card's value is higher/lower, respectively, than the two
                  cards' values, you will get a point. Alternatively, you will
                  lose a point.
                </span>
              </li>
              <li className="rule">
                <span>
                  Ultimately, if you chose the option <b>&nbsp;NO DEAL</b>, you
                  will lose half a point.
                </span>
              </li>
              <li className="rule">
                <label htmlFor="rounds">
                  Please select the number of rounds
                </label>
                <select
                  name="rounds"
                  className="form-select"
                  onChange={this.handleSelect.bind(this)}
                >
                  <option value="5">5 Rounds</option>
                  <option value="10">10 Rounds</option>
                  <option value="17">17 Rounds</option>
                </select>
              </li>
            </ul>
          </div>
        </div>

        <div className="start">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.start(this.rounds);
            }}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  handleSelect(event: BaseSyntheticEvent) {
    this.rounds = parseInt(event.target.value);
  }
}
