let editButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupButton = popup.querySelector('.popup__button');
let popupName = document.getElementsByName('popup-name');
let popupJob = document.getElementsByName('popup-job');
let popupClose = popup.querySelector(".popup__close");


function showPopup() {
  popup.classList.toggle('popup_opened');
  popupName[0].value = profileTitle.textContent;
  popupJob[0].value = profileSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupName[0].value;
  profileSubtitle.textContent = popupJob[0].value;
  closePopup();
}
editButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
