import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileName,
  profileWorkplace,
  profileEditButton,
  profileAddButton,
  cardContainer,
  popupEditProfile,
  formEditProfile,
  nameEditProfile,
  workplaceEditProfile,
  popupAddCard,
  formAddCard,
  titleAddCard,
  linkAddCard,
  popupImage,
  cardsData,
  validationConfig
} from '../utils/constants.js';

// Форма редактирования профиля

const formValidatorEditProfile = new FormValidator(formEditProfile, validationConfig);
formValidatorEditProfile.enableValidation();

const popupWithFormEditProfile = new PopupWithForm(popupEditProfile, (data) => {
  userInfo.setUserInfo(data);
  popupWithFormEditProfile.close();
});
popupWithFormEditProfile.setEventListeners();

const userInfo = new UserInfo({
  name: profileName,
  workplace: profileWorkplace
});

// Открыть форму редактирования профиля

const openPopupEditProfile = () => {
  const userInfoData = userInfo.getUserInfo();

  nameEditProfile.value = userInfoData.name;
  workplaceEditProfile.value = userInfoData.workplace;

  formValidatorEditProfile.hideAllErrors();
  popupWithFormEditProfile.open();
};

profileEditButton.addEventListener('click', openPopupEditProfile);

// Форма добавления карточки

const formValidatorAddCard = new FormValidator(formAddCard, validationConfig);
formValidatorAddCard.enableValidation();

const popupWithFormAddCard = new PopupWithForm(popupAddCard, (cardData) => {
  const card = createCard(cardData);

  cardsSection.setItem(card);
  popupWithFormAddCard.close();
});
popupWithFormAddCard.setEventListeners();

// Открыть форму добавления карточки
const openPopupAddCard = () => {
  formValidatorAddCard.hideAllErrors();
  popupWithFormAddCard.open();
};

profileAddButton.addEventListener('click', openPopupAddCard);

// Форма карточки

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Открыть форму карточки
const openPopupImage = (data) => {
  popupWithImage.open(data);
};

// Шесть карточек «из коробки»

const createCard = (cardData) => {
  const card = new Card(cardData, '.template', openPopupImage);

  return card.generateCard();
};

const cardsSection = new Section({
  renderer: (cardData) => {
    const card = createCard(cardData);

    cardsSection.setItem(card);
  }
}, cardContainer);

cardsSection.renderItems(cardsData);
