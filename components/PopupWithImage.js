import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._image = this._popup.querySelector('#image-open-image');;
    this._caption = this._popup.querySelector('#image-caption-open-image');
  }

  open(name, link) {
    super.open();

    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
}
