export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._cardList = container;
  }

  renderItems(container) {
    container.forEach(data => {
      this._renderer(data);
    });
  }

  setItem(card) {
    this._cardList.append(card);
  }
}
