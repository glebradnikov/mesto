export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.addEventListener('keydown', this._handleEscClose.bind(this));

  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget && event.which === 1) {
        this.close();
      }
    })
  }
}
