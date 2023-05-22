export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handlePopupEsc = this._handlePopupEsc.bind(this);
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handlePopupEsc);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handlePopupEsc);
  };

  _handlePopupEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handlePopupClick(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      this._handlePopupClick(evt)
    });
    this._buttonClose.addEventListener('click', () => {
      this.close();
    })
  }

}