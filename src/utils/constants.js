export const profileAvatarButton = document.querySelector('#edit-avatar-button');
export const profileImage = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__workplace');
export const profileEditButton = document.querySelector('#edit-profile-button');
export const profileAddButton = document.querySelector('.profile__add');

export const cardContainer = document.querySelector('.elements__list');

export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const formEditProfile = document.forms.editProfile;
export const nameEditProfile = formEditProfile.elements.name;
export const aboutEditProfile = formEditProfile.elements.about;


export const popupAddCard = document.querySelector('#popup-add-card');
export const formAddCard = document.forms.addElement;

export const popupImage = document.querySelector('#popup-image');

export const popupConfirm = document.querySelector('#popup-confirm');

export const popupAvatar = document.querySelector('#popup-avatar');
export const formAvatar = document.forms.avatar;

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'e00a1ab1-46c1-4239-9ab0-198fbc69965a',
    'Content-Type': 'application/json'
  }
};

export const validationConfig = {
  form: '.popup__form',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  error: 'popup__error_active',
  submitButton: '.popup__submit',
  submitButtonDisabled: 'popup__submit_disabled'
};
