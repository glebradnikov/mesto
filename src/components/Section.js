export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(dataList) {
    dataList.forEach(data => {
      this._renderer(data);
    });
  }

  setItem(card) {
    this._container.prepend(card);
  }
}
