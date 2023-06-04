export class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._subtitleElement = this._element.querySelector('.element__subtitle');
    this._photoElement = this._element.querySelector('.element__photo');
    this._likeElement = this._element.querySelector('.element__like');
    this._deleteButtonElement = this._element.querySelector('.element__delete-icon');
    this._likeCounterElement = this._element.querySelector('.element__count-like');

    this._setEventListeners();

    this._subtitleElement.textContent = this._name;
    this._photoElement.alt = this._name;
    this._photoElement.src = this._link;
    this._likeCounterElement.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this._deleteButtonElement.remove();
    }

    if (this._likes.some((like) => like._id === this._userId)) {
      this._likeElement.classList.add("element__like_active");
    }


    return this._element;
  }

  isLiked() {
    if (this._likeElement.classList.contains('element__like_active')) {
      return true
    } else {
      return false
    }
  }

  toggleLikeCard(data) {
    this._likeElement.classList.toggle('element__like_active');
    this._likeCounterElement.textContent = data.likes.length;
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this.isLiked())
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this._element)
    });
    this._photoElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

