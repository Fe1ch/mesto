import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, validationConfig } from '../utils/initial-cards.js';
import { switcherIndicator, switchTheme } from '../utils/theme.js';
import {
  addButton,
  editButton,
  formProfile,
  profileNameInput,
  profileJobInput,
  formNewCard,
  avatarEditButton,
  formAvatar
} from '../utils/constants.js';

// Переменные которые принимают класс FormValidator
//  с конфигом и самой формой и дальше включают валидацию в кажой форме
const validationFormProfile = new FormValidator(validationConfig, formProfile);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, formNewCard);
validationFormCard.enableValidation();
const validationFormAvatar = new FormValidator(validationConfig, formAvatar);
validationFormAvatar.enableValidation();

//Принимает класс увелечения картинки в карточке и включает обработчики
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// Функция для создания карточки
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  }, '#element-template');

  return card.generateCard();
};

// Перебириаем массив (объектов) для добавления карточек на старницу и вкл метода рендер 
const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item))
  }
}, '.elements__container');
cardsContainer.renderItems(initialCards);

// Принимаем класс о информации профиля 
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
  selectorUserAvatar: '.profile__avatar'
});

//Принимаем класс попапа формы профиля и вкл обработчики  
const popupProfileForm = new PopupWithForm('.popup_type_edit', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
  }
})
popupProfileForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап профиля 
editButton.addEventListener('click', () => {
  validationFormProfile.resetValidationState();
  popupProfileForm.open();
  const data = userInfo.getUserInfo()
  profileNameInput.value = data.name;
  profileJobInput.value = data.job;
})
//Принимаем класс попапа формы добавления карточки  и вкл обработчики 
const popupNewCardForm = new PopupWithForm('.popup_type_new-card', {
  handleFormSubmit: (data) => {
    cardsContainer.addNewItem(createCard(data))
  }
})
popupNewCardForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап добавления карточки  
addButton.addEventListener('click', () => {
  validationFormCard.resetValidationState();
  popupNewCardForm.open()
})

//Принимаем класс попапа формы аватарки  и вкл обработчики 
const popupAvatarForm = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    userInfo.setUserAvatar(data)
  }
})
popupAvatarForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап аватара 
avatarEditButton.addEventListener('click', () => {
  validationFormAvatar.resetValidationState();
  popupAvatarForm.open();
});

// Обработчики на режим смены темы и сохранения ее 
switcherIndicator.addEventListener('click', () => {
  switchTheme();
});
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    switchTheme();
  }
});