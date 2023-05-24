export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._setEventListeners();

    this._subtitleElement.textContent = this._name;
    this._photoElement.alt = this._name;
    this._photoElement.src = this._link;


    return this._element;
  }

  _likeCard() {
    this.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
  _setEventListeners() {
    this._likeElement.addEventListener('click', this._likeCard);
    this._deleteButtonElement.addEventListener('click', () => this._deleteCard());
    this._photoElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

