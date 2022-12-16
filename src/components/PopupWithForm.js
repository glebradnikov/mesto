import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);

    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submit = this._popup.querySelector('.popup__submit');
    this._submitText = this._submit.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submit.textContent = 'Сохранение...';
    } else {
      this._submit.textContent = this._submitText;
    }
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      this.renderLoading(true);
      this._handleSubmit(this._getInputValues());
    });
  }
}
