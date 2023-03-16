let editButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupButton = popupForm.querySelector('.popup__button');
let popupName = popupForm.querySelector('.popup__input_text_name');
let popupJob = popupForm.querySelector('.popup__input_text_job');
let popupClose = popup.querySelector(".popup__close");

function showPopup() {
  popup.classList.toggle('popup_opened');

  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupJob.value;
  closePopup();
}
editButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
