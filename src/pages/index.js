import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, validationConfig } from '../utils/initial-cards.js';
import { switcherIndicator, switcher } from '../utils/theme.js';
import {
  elementsContainer,
  addButton,
  editButton,
  profileTitle,
  profileSubtitle,
  popupProfile,
  formProfile,
  profileNameInput,
  profileJobInput,
  popupNewCard,
  formNewCard,
  popupImage,
  avatarImg,
  avatarEditButton,
  popupAvatar,
  formAvatar,
  popupInputAvatarLink
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
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Функция для создания карточки
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  }, '#element-template');
  const cardElement = card.generateCard();

  return cardElement;
};

// Перебириаем массив (объектов) для добавления карточек на старницу и вкл метода рендер 
const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsContainer.addItem(createCard(item))
  }
}, elementsContainer);
cardsContainer.renderItems();

// Принимаем класс о информации профиля 
const userInfo = new UserInfo({
  name: profileTitle,
  job: profileSubtitle
});

//Принимаем класс попапа формы профиля и вкл обработчики  
const popupProfileForm = new PopupWithForm(popupProfile, {
  handleFormSubmit: (input) => {
    const data = {
      name: input['input-name'],
      job: input['input-job']
    }
    userInfo.setUserInfo(data);
  }
})
popupProfileForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап профиля 
editButton.addEventListener('click', () => {
  validationFormProfile.resetButtonState();
  popupProfileForm.open();
  profileNameInput.value = userInfo.getUserInfo().name;
  profileJobInput.value = userInfo.getUserInfo().job;
})
//Принимаем класс попапа формы добавления карточки  и вкл обработчики 
const popupNewCardForm = new PopupWithForm(popupNewCard, {
  handleFormSubmit: (input) => {
    const data = {
      name: input['input-card-name'],
      link: input['input-card-link']
    }
    cardsContainer.newAddItem(createCard(data))
  }
})
popupNewCardForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап добавления карточки  
addButton.addEventListener('click', () => {
  validationFormCard.resetButtonState();
  popupNewCardForm.open()
})

//Принимаем класс попапа формы аватарки  и вкл обработчики 
const popupAvatarForm = new PopupWithForm(popupAvatar, {
  handleFormSubmit: () => {
    avatarImg.src = popupInputAvatarLink.value;
  }
})
popupAvatarForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап аватара 
avatarEditButton.addEventListener('click', () => {
  validationFormAvatar.resetButtonState();
  popupAvatarForm.open();
});

// Обработчики на режим смены темы и сохранения ее 
switcherIndicator.addEventListener('click', () => {
  switcher();
});
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    switcher();
  }
});