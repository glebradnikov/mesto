export default class Card {
  constructor(initialData, template, openPopupOpenImage) {
    this._name = initialData.name;
    this._link = initialData.link;
    this._template = template;
    this._openPopupOpenImage = openPopupOpenImage;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._openPopupOpenImage(this._name, this._link);
    });

    this._elementLike.addEventListener('click', this._likeCard);

    this._elementDelete.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _getTemplate() {
    const template = document
      .querySelector(this._template)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return template;
  }

  generateCard() {
    this._elementItem = this._getTemplate();

    this._elementImage = this._elementItem.querySelector('.elements__image');
    this._elementTitle = this._elementItem.querySelector('.elements__title');
    this._elementLike = this._elementItem.querySelector('.elements__like');
    this._elementDelete = this._elementItem.querySelector('.elements__delete');

    this._elementImage.src = this._link;
    this._elementImage.setAttribute('alt', this._name);
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._elementItem;
  }

  _likeCard(event) {
    event.target.classList.toggle('elements__like_active');
  }

  _deleteCard() {
    this._elementItem.remove();
  }
}
