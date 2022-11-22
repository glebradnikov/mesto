export default class Section {
  constructor({ render }, elementsList) {
    this._render = render;
    this._elementsList = elementsList;
  }

  renderItems(elements) {
    elements.forEach(data => {
      this._render(data);
    });
  }

  setItem(element) {
    this._elementsList.append(element);
  }
}
