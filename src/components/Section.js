export default class Section {
  constructor({ renderer }, dataList) {
    this._renderer = renderer;
    this._dataList = dataList;
  }

  renderItems(dataList) {
    dataList.forEach(data => {
      this._renderer(data);
    });
  }

  setItem(card) {
    this._dataList.prepend(card);
  }
}
