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

  addItem(item) {
    this._container.prepend(item);
  }
}
