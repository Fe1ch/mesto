import { Popup } from "./Popup.js";

export class PopupWithRemove extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }


  setCallback(handleDelete) {
    this._handleSubmit = handleDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
