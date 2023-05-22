import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = popupSelector.querySelector('.popup__photo');
    this._subtitle = popupSelector.querySelector('.popup__photo-subtitle');
  }

  open(name, link) {
    super.open();
    this._photo.src = link;
    this._photo.alt = name;
    this._subtitle.textContent = name;
  }
}