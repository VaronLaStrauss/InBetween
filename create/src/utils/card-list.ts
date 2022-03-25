import SUITE_LIST from "./suite-list";

let _cardNumbers = Array.from({ length: 13 }, (_, i) => i + 1);

const CARD_LIST = new Map(
  SUITE_LIST.map((suite) => {
    return [suite, [..._cardNumbers]];
  })
);

export default CARD_LIST;
