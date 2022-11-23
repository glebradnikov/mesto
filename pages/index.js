import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileEditButton,
  profileName,
  profileWorkplace,
  profileAddButton,
  elementsList,
  popupEditProfile,
  formEditProfile,
  nameInputEditProfile,
  workplaceInputEditProfile,
  popupAddElement,
  formAddElement,
  titleInputAddElement,
  urlInputAddElement,
  popupOpenImage,
  initialElements,
  validationConfig
} from '../utils/constants.js';

// Форма редактирования профиля

const userInfo = new UserInfo({
  name: '.profile__name',
  workplace: '.profile__workplace'
});

const editProfileFormValidator = new FormValidator(formEditProfile, validationConfig);
editProfileFormValidator.enableValidation();

const editProfilePopupWithForm = new PopupWithForm(popupEditProfile, () => {
  userInfo.setUserInfo({
    name: nameInputEditProfile.value,
    workplace: workplaceInputEditProfile.value
  });
  editProfilePopupWithForm.close();
});
editProfilePopupWithForm.setEventListeners();

// Открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInputEditProfile.value = userInfo.getUserInfo().name;
  workplaceInputEditProfile.value = userInfo.getUserInfo().workplace;

  editProfileFormValidator.hideAllErrors();
  editProfilePopupWithForm.open();
});

// Форма добавления карточки

const addElementFormValidator = new FormValidator(formAddElement, validationConfig);
addElementFormValidator.enableValidation();

const addElementPopupWithForm = new PopupWithForm(popupAddElement, () => {
  const card = createCard(titleInputAddElement.value, urlInputAddElement.value);

  elementsList.prepend(card);
  addElementPopupWithForm.close();
});
addElementPopupWithForm.setEventListeners();

// Открыть форму добавления карточки
profileAddButton.addEventListener('click', () => {
  addElementFormValidator.hideAllErrors();
  addElementPopupWithForm.open();
});

// Форма карточки

// Открыть форму карточки
const openImagePopup = new PopupWithImage(popupOpenImage);
openImagePopup.setEventListeners();

const handleCardClick = (name, link) => {
  openImagePopup.open(name, link);
};

// Шесть карточек «из коробки»

const createCard = (name, link) => {
  const card = new Card(
    {
      name,
      link,
    }, '.template', handleCardClick);

  return card.generateCard();
};

const initialElementsList = new Section({
  render: (data) => {
    const card = createCard(data.name, data.link);

    initialElementsList.setItem(card);
  }
}, elementsList);

initialElementsList.renderItems(initialElements);
