export class Card {
  constructor(initialElements, template, openPopupOpenImage) {
    this._name = initialElements.name;
    this._link = initialElements.link;
    this._template = template;
    this._openPopupOpenImage = openPopupOpenImage;
  }

  _setEventListeners() {
    this._template.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopupOpenImage(this._template.querySelector('.elements__title').textContent, this._template.querySelector('.elements__image').src);
    });

    this._template.querySelector('.elements__like').addEventListener('click', this._likeCard);

    this._template.querySelector('.elements__delete').addEventListener('click', () => {
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
    this._template = this._getTemplate();
    this._template.querySelector('.elements__image').src = this._link;
    this._template.querySelector('.elements__image').setAttribute('alt', this._name);
    this._template.querySelector('.elements__title').textContent = this._name;
    this._setEventListeners();

    return this._template;
  }

  _likeCard(event) {
    event.target.classList.toggle('elements__like_active');
  }

  _deleteCard() {
    this._template.remove();
  }
}
