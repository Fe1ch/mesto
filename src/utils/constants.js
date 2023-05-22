// Контейнер для добавления карточек
export const elementsContainer = document.querySelector('.elements__container');

// Элементы секции Профиля
export const addButton = document.querySelector('.profile__add-button')
export const editButton = document.querySelector('.profile__edit-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

// Элементы попапа для редактирования профиля
export const popupProfile = document.querySelector('.popup_type_edit');
export const formProfile = popupProfile.querySelector('.popup__form');
export const profileNameInput = popupProfile.querySelector('.popup__input_type_profile-name');
export const profileJobInput = popupProfile.querySelector('.popup__input_type_profile-job');

// Элементы попапа для добавления карточки
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const formNewCard = popupNewCard.querySelector('.popup__form_type_card');

// Элементы попапа для увелечения картинки в карточке
export const popupImage = document.querySelector('.popup_type_image');

// Элементы попапа для изменения аватара
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const formAvatar = popupAvatar.querySelector('.popup__form');
export const popupInputAvatarLink = popupAvatar.querySelector('.popup__input_type_avatar-link');

export const avatarImg = document.querySelector('.profile__avatar');
export const avatarEditButton = document.querySelector('.profile__avatar-edit');