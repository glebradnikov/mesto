export default class Card {
  constructor(data, template, openCard, deleteCard, addLike, deleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._template = template;
    this._openCard = openCard;
    this._deleteCard = deleteCard;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._template)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return template;
  }

  _isLiked() {
    this._likes.forEach((data) => {
      if (data._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._openCard(this._name, this._link);
    });

    this._elementLike.addEventListener('click', () => {
      if (this._elementLike.classList.contains('elements__like_active')) {
        this._deleteLike();
      } else {
        this._addLike();
      }
    });

    this._elementDelete.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._elementItem = this._getTemplate();

    this._elementImage = this._elementItem.querySelector('.elements__image');
    this._elementTitle = this._elementItem.querySelector('.elements__title');
    this._elementLike = this._elementItem.querySelector('.elements__like');
    this._elementLikeCounter = this._elementItem.querySelector('.elements__like-counter');
    this._elementDelete = this._elementItem.querySelector('.elements__delete');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeCounter.textContent = this._likes.length;

    this._isLiked();
    this._setEventListeners();

    return this._elementItem;
  }

  remove() {
    if (this._ownerId === this._userId) {
      this._elementItem.remove();
      this._elementItem = null;
    }
  }

  like() {
    this._elementLike.classList.add('elements__like_active');
  }

  dislike() {
    this._elementLike.classList.remove('elements__like_active');
  }

  likeCounter(response) {
    this._elementLikeCounter.textContent = `${response.likes.length}`;
  }
}
