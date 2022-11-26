export default class Section {
  constructor({ renderer }, cardList) {
    this._renderer = renderer;
    this._cardList = cardList;
  }

  renderItems(cardList) {
    cardList.forEach(cardData => {
      this._renderer(cardData);
    });
  }

  setItem(card) {
    this._cardList.append(card);
  }
}
