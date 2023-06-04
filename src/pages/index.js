import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithRemove } from '../components/PopupWithRemove.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { validationConfig } from '../utils/initial-cards.js';
import { switcherIndicator, switchTheme } from '../utils/theme.js';
import { requestLoading } from '../utils/utils.js';
import {
  addButton,
  editButton,
  formProfile,
  formNewCard,
  avatarEditButton,
  formAvatar,
  formDelete
} from '../utils/constants.js';

// Переменные которые принимают класс FormValidator
//  с конфигом и самой формой и дальше включают валидацию в кажой форме
const validationFormProfile = new FormValidator(validationConfig, formProfile);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, formNewCard);
validationFormCard.enableValidation();
const validationFormAvatar = new FormValidator(validationConfig, formAvatar);
validationFormAvatar.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'f53ec09c-3e53-48d5-bf06-d899fc9c4246',
    'Content-Type': 'application/json'
  }
})

let userId = 0;

Promise.all([api.getUserInfoProfile(), api.getInitialsCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    cardsContainer.renderItems(cards);
    userInfo.setUserAvatar(data);
  })
  .catch((err) => {
    console.log(err);
  })

//Принимает класс увелечения картинки в карточке и включает обработчики
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithRemove = new PopupWithRemove('.popup_type_submit-delete');
popupWithRemove.setEventListeners();

// Функция для создания карточки
function createCard(data) {
  const card = new Card({
    data,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (cardId, element) => {
      popupWithRemove.open();
      popupWithRemove.handleDeleteCard(() => {
        requestLoading(formDelete, true, 'Удаление...');
        api.deleteCard(cardId)
          .then(() => {
            element.remove();
            popupWithRemove.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            requestLoading(formDelete, false, 'Да')
          })
      })
    },
    handleLikeClick: (cardId, isLiked) => {
      api.changeLike(cardId, isLiked)
        .then((data) => {
          card.toggleLikeCard(data)
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, '#element-template', userId);

  return card.generateCard();
};

// Перебириаем массив (объектов) для добавления карточек на старницу и вкл метода рендер 
const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item))
  }
}, '.elements__container');

// Принимаем класс о информации профиля 
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserAbout: '.profile__subtitle',
  selectorUserAvatar: '.profile__avatar'
});

//Принимаем класс попапа формы профиля и вкл обработчики  
const popupProfileForm = new PopupWithForm('.popup_type_edit', {
  handleFormSubmit: (data) => {
    requestLoading(formProfile, true, 'Cохранение...');
    api.setUserInfoProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        requestLoading(formProfile, false, 'Сохранить');
      })
  }
})
popupProfileForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап профиля 
editButton.addEventListener('click', () => {
  validationFormProfile.resetValidationState();
  popupProfileForm.open();
  popupProfileForm.setInputValues(userInfo.getUserInfo());
})
//Принимаем класс попапа формы добавления карточки  и вкл обработчики
const popupNewCardForm = new PopupWithForm('.popup_type_new-card', {
  handleFormSubmit: (data) => {
    requestLoading(formNewCard, true, 'Сохранение...')
    api.addNewCard(data)
      .then((res) => {
        cardsContainer.addNewItem(createCard(res));
        popupNewCardForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        requestLoading(formNewCard, false, 'Создать')
      })
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
    requestLoading(formAvatar, true, 'Сохранение...');
    api.setUserAvatarProfile(data)
      .then((res) => {
        userInfo.setUserAvatar(res)
        popupAvatarForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        requestLoading(formAvatar, false, 'Сохранить')
      })
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