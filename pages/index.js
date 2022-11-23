import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
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
  imageOpenImage,
  imageCaptionOpenImage,
  initialElements,
  validationConfig
} from '../utils/constants.js';

// Форма редактирования профиля

const editProfileFormValidator = new FormValidator(formEditProfile, validationConfig);
editProfileFormValidator.enableValidation();

const editProfilePopup = new Popup(popupEditProfile);
editProfilePopup.setEventListeners();

// Открыть форму редактирования профиля
const openPopupEditProfile = () => {
  nameInputEditProfile.value = profileName.textContent;
  workplaceInputEditProfile.value = profileWorkplace.textContent;

  editProfileFormValidator.hideAllErrors();
  editProfilePopup.open();
};

profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправить форму редактирования профиля
const submitFormEditProfile = (event) => {
  event.preventDefault();

  profileName.textContent = nameInputEditProfile.value;
  profileWorkplace.textContent = workplaceInputEditProfile.value;

  editProfilePopup.close();
};

formEditProfile.addEventListener('submit', submitFormEditProfile);

// Форма добавления карточки

const addElementFormValidator = new FormValidator(formAddElement, validationConfig);
addElementFormValidator.enableValidation();

const addElementPopup = new Popup(popupAddElement);
addElementPopup.setEventListeners();

// Открыть форму добавления карточки
const openAddElementPopup = () => {
  formAddElement.reset();
  addElementFormValidator.hideAllErrors();

  addElementPopup.open();
};

profileAddButton.addEventListener('click', openAddElementPopup);

// Добавление карточки
const submitFormAddElement = (event) => {
  event.preventDefault();

  const card = createCard(titleInputAddElement.value, urlInputAddElement.value);

  elementsList.prepend(card);

  addElementPopup.close();
};

formAddElement.addEventListener('submit', submitFormAddElement);

// Форма карточки

const openImagePopup = new PopupWithImage(popupOpenImage);
openImagePopup.setEventListeners();

// Открыть форму карточки
const openPopupOpenImage = (name, link) => {
  openImagePopup.open(name, link);
};

// Шесть карточек «из коробки»

const createCard = (name, link) => {
  const card = new Card(
    {
      name,
      link,
    }, '.template', openPopupOpenImage);

  return card.generateCard();
};

const initialElementsList = new Section({
  render: (data) => {
    const card = createCard(data.name, data.link);

    initialElementsList.setItem(card);
  }
}, elementsList);

initialElementsList.renderItems(initialElements);
