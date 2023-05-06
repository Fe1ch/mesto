import { Card } from './Card.js';
import { initialCards, validationConfig } from './initial-cards.js';
import { FormValidator } from './FormValidator.js';

// Контейнер для добавления карточек
const elementsContainer = document.querySelector('.elements__container');


// Элементы секции Профиля
const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


// Элементы попапа для редактирования профиля
const popupProfile = document.querySelector('.popup_type_edit');
const popupCloseProfile = popupProfile.querySelector(".popup__close");
const formProfile = popupProfile.querySelector('.popup__form');
const profileNameInput = popupProfile.querySelector('.popup__input_type_profile-name');
const profileJobInput = popupProfile.querySelector('.popup__input_type_profile-job');


// Элементы попапа для добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseNewCard = popupNewCard.querySelector(".popup__close");
const formNewCard = popupNewCard.querySelector('.popup__form_type_card');
const formInputCardName = popupNewCard.querySelector('.popup__input_type_card-name');
const formInputCardLink = popupNewCard.querySelector('.popup__input_type_card-link');


// Элементы попапа для увелечения картинки в карточке
const popupImage = document.querySelector('.popup_type_image');
const popupCloseImage = popupImage.querySelector('.popup__close');
const scalableImage = popupImage.querySelector('.popup__photo');
const subtitleImage = popupImage.querySelector('.popup__photo-subtitle');


// Элементы попапа для изменения аватара
const avatarImg = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const popupCloseAvatar = popupAvatar.querySelector('.popup__close');
const popupInputAvatarLink = popupAvatar.querySelector('.popup__input_type_avatar-link');


// Переменные которые принимают класс FormValidator
//  с конфигом и самой формой и дальше включают валидацию в кажой форме
const validationFormProfile = new FormValidator(validationConfig, formProfile);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, formNewCard);
validationFormCard.enableValidation();
const validationFormAvatar = new FormValidator(validationConfig, formAvatar);
validationFormAvatar.enableValidation();

// Функция открытия ПОПАПА
function showPopup(typePopup) {
  typePopup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEsc);
};

// Функция закрытия ПОПАПА
function closePopup(typePopup) {
  typePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupEsc);
};

// Функия редактирования ПРОФИЛЯ
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(popupProfile);
};

// Обработчик событий для открытия попапа(Редактировать профиль)
editButton.addEventListener('click', () => {
  showPopup(popupProfile);
  validationFormProfile.resetButtonState();
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
});

// Обработчик событий для закрытия попапа(Редактировать профиль)
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));

// Обрыботчик событий для сохренеия данных попапа (Редактировать профиль)
formProfile.addEventListener('submit', handleEditFormSubmit);


// Функция для создания карточки
function createCard(data) {
  const card = new Card(data, '#element-template', handleCardClick);

  return card.generateCard();
};


// Функция для открытия попапа картинки в карточке
function handleCardClick(cardImage) {
  showPopup(popupImage);
  scalableImage.src = cardImage.link;
  subtitleImage.textContent = cardImage.name;
  scalableImage.alt = cardImage.name;
}

// Функция для добавления карточки
function handleFormAddCard(evt) {
  evt.preventDefault();
  const newObject = {
    name: formInputCardName.value,
    link: formInputCardLink.value
  };
  elementsContainer.prepend(createCard(newObject));
  closePopup(popupNewCard);
  formNewCard.reset();
};

// Обработчик событий для добавления карточки на страницу
formNewCard.addEventListener('submit', handleFormAddCard);

// Перебириаем массив (объектов) для добавления карточек на старницу
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  elementsContainer.append(newCard);
});

// Обработчик событий для открытия попапа(Добавления карточек)
addButton.addEventListener('click', () => {
  showPopup(popupNewCard);
  validationFormCard.resetButtonState();
});

// Обработчик событий для удаления попапа(Добавления карточек)
popupCloseNewCard.addEventListener('click', () => closePopup(popupNewCard));

// Обработчик событий для удаления попапа увелечния картинки в карточке
popupCloseImage.addEventListener('click', () => closePopup(popupImage));


//Функция для закрытия попапа кликом на оверлей
function handlePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

// Обработчики событий для закрытия попапа по клику на оверлей
popupProfile.addEventListener('mousedown', handlePopupClick);
popupNewCard.addEventListener('mousedown', handlePopupClick);
popupImage.addEventListener('mousedown', handlePopupClick);

//Функция для закрытия попапа на клавишу ESC
function handlePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Обработчик для открытия попапа изменения аватарки профиля 
avatarEditButton.addEventListener('click', () => {
  showPopup(popupAvatar);
  validationFormAvatar.resetButtonState();
});

// Обработчик для закрытия попапа изменения аватарки профиля
popupCloseAvatar.addEventListener('click', () => closePopup(popupAvatar));

// Функция для изменения Аватарки профиля
function handleFormAvatar(evt) {
  evt.preventDefault();
  avatarImg.src = popupInputAvatarLink.value;
  formAvatar.reset();
  closePopup(popupAvatar);
};
// Обработчик для изменения Аватарки профиля
formAvatar.addEventListener('submit', handleFormAvatar);