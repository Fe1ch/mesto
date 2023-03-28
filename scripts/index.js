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
const formNewCard = popupNewCard.querySelector('.popup__form');
const formInputCardName = popupNewCard.querySelector('.popup__input_type_card-name');
const formInputCardLink = popupNewCard.querySelector('.popup__input_type_card-link');


// Элементы попапа для увелечения картинки в карточке
const popupImage = document.querySelector('.popup_type_image');
const popupCloseImage = popupImage.querySelector('.popup__close');
const scalableImage = popupImage.querySelector('.popup__photo');
const subtitleImage = popupImage.querySelector('.popup__photo-subtitle');


// Функция открытия ПОПАПА
function showPopup(typePopup) {
  typePopup.classList.add('popup_opened');
};

// Функция закрытия ПОПАПА
function closePopup(typePopup) {
  typePopup.classList.remove('popup_opened');
};

// Функия редактирования ПРОФИЛЯ
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(popupProfile);
};

// Обработчик событий для открытия попапа(Редактировать профиль)
editButton.addEventListener('click', () => {
  showPopup(popupProfile);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
});

// Обработчик событий для закрытия попапа(Редактировать профиль)
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));

// Обрыботчик событий для сохренеия данных попапа (Редактировать профиль)
formProfile.addEventListener('submit', handleFormSubmit);

// Функция для создания карточки
function createCard(item) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const cardImg = cardElement.querySelector('.element__photo');
  const cardDelete = cardElement.querySelector('.element__delete-icon');
  const cardSubtitle = cardElement.querySelector('.element__subtitle');
  const cardLike = cardElement.querySelector('.element__like');

  cardSubtitle.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = (`Фото ${item.name}`);

  // Обработчик события - лайк на карточке
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  //Обработчик события удаление карточки
  cardDelete.addEventListener('click', function () {
    const deleteItem = cardDelete.closest('.element');
    deleteItem.remove();
  });

  // Обработчик событий попапа для увелечения картинки в карточке
  cardImg.addEventListener('click', function () {
    showPopup(popupImage);
    subtitleImage.textContent = cardSubtitle.textContent;
    scalableImage.src = cardImg.src;
    scalableImage.alt = cardImg.alt;
  });

  return cardElement;
};

// Функция для добавления карточки
function handleFormAddCard(evt) {
  evt.preventDefault();
  const newObject = {
    name: formInputCardName.value,
    link: formInputCardLink.value
  };
  elementsContainer.prepend(createCard(newObject));
  formNewCard.reset();
  closePopup(popupNewCard);
};

// Обработчик событий для добавления карточки на страницу
formNewCard.addEventListener('submit', handleFormAddCard);

// Перебириаем массив (объектов) для добавления карточек на старницу
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  elementsContainer.append(newCard);
});

// Обработчик событий для открытия попапа(Добавления карточек)
addButton.addEventListener('click', () => showPopup(popupNewCard));

// Обработчик событий для удаления попапа(Добавления карточек)
popupCloseNewCard.addEventListener('click', () => closePopup(popupNewCard));

// Обработчик событий для удаления попапа увелечния картинки в карточке
popupCloseImage.addEventListener('click', () => closePopup(popupImage));




// const cardLikes = Array.from(document.querySelectorAll('.element__like'));

// cardLikes.forEach((element__like) => {
//   element__like.addEventListener('click', () => {
//     element__like.classList.toggle('element__like_active');
//   });
// });
// console.log(cardLikes);

// const cardLike = document.querySelector('.element__like');
// function like() {
//   cardLike.classList.toggle('element__like_active')
// };
// cardLike.addEventListener('click', like);
