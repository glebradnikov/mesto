import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);

    this._handleSubmit = handleSubmit;
  }

  submitHandler(data) {
    this._handleSubmit = data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      this._handleSubmit();
    });
  }
}
