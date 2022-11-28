import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);

    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
