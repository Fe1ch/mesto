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
import { setSubmitButtonText } from '../utils/utils.js';
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
    handleDeleteClick: () => {
      popupWithRemove.open();
      popupWithRemove.setCallback(() => {
        setSubmitButtonText(formDelete, 'Удаление...');
        api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupWithRemove.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setSubmitButtonText(formDelete, 'Да')
          })
      })
    },
    handleLikeClick: () => {
      api.changeLike(card.getId(), card.isLiked())
        .then((data) => {
          card.updateLikes(data.likes)
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
    cardsContainer.appendItem(createCard(item))
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
    setSubmitButtonText(formProfile, 'Cохранение...');
    api.setUserInfoProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitButtonText(formProfile, 'Сохранить');
      })
  }
})
popupProfileForm.setEventListeners();

//Принимаем класс попапа формы добавления карточки  и вкл обработчики
const popupNewCardForm = new PopupWithForm('.popup_type_new-card', {
  handleFormSubmit: (data) => {
    setSubmitButtonText(formNewCard, 'Сохранение...')
    api.addNewCard(data)
      .then((res) => {
        cardsContainer.prependItem(createCard(res));
        popupNewCardForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setSubmitButtonText(formNewCard, 'Создать')
      })
  }
})
popupNewCardForm.setEventListeners();

//Принимаем класс попапа формы аватарки  и вкл обработчики 
const popupAvatarForm = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    setSubmitButtonText(formAvatar, 'Сохранение...');
    api.setUserAvatarProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res)
        popupAvatarForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setSubmitButtonText(formAvatar, 'Сохранить')
      })
  }
})
popupAvatarForm.setEventListeners();

// Вешаем обработчик на кнопку чтоб открыть попап профиля 
editButton.addEventListener('click', () => {
  validationFormProfile.resetValidationState();
  popupProfileForm.open();
  popupProfileForm.setInputValues(userInfo.getUserInfo());
})

// Вешаем обработчик на кнопку чтоб открыть попап добавления карточки  
addButton.addEventListener('click', () => {
  validationFormCard.resetValidationState();
  popupNewCardForm.open()
})

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