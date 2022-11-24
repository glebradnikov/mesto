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
  cardList,
  popupEditProfile,
  formEditProfile,
  nameEditProfile,
  workplaceEditProfile,
  popupAddCard,
  formAddCard,
  titleAddCard,
  linkAddCard,
  popupImage,
  cardData,
  validationData
} from '../utils/constants.js';

// Форма редактирования профиля

const formValidatorEditProfile = new FormValidator(formEditProfile, validationData);
formValidatorEditProfile.enableValidation();

const popupWithFormEditProfile = new PopupWithForm(popupEditProfile, () => {
  userInfo.setUserInfo({
    name: nameEditProfile.value,
    workplace: workplaceEditProfile.value
  });
  popupWithFormEditProfile.close();
});
popupWithFormEditProfile.setEventListeners();

const userInfo = new UserInfo({
  name: profileName,
  workplace: profileWorkplace
});

// Открыть форму редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameEditProfile.value = userInfo.getUserInfo().name;
  workplaceEditProfile.value = userInfo.getUserInfo().workplace;

  formValidatorEditProfile.hideAllErrors();
  popupWithFormEditProfile.open();
});

// Форма добавления карточки

const formValidatorAddCard = new FormValidator(formAddCard, validationData);
formValidatorAddCard.enableValidation();

const popupWithFormAddCard = new PopupWithForm(popupAddCard, () => {
  const card = createCard(titleAddCard.value, linkAddCard.value);

  cardList.prepend(card);
  popupWithFormAddCard.close();
});
popupWithFormAddCard.setEventListeners();

// Открыть форму добавления карточки
profileAddButton.addEventListener('click', () => {
  formValidatorAddCard.hideAllErrors();
  popupWithFormAddCard.open();
});

// Форма карточки

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Открыть форму карточки

const openPopupImage = (title, link) => {
  popupWithImage.open(title, link);
};

// Шесть карточек «из коробки»

const createCard = (title, link) => {
  const card = new Card(
    {
      title,
      link,
    }, '.template', openPopupImage);

  return card.generateCard();
};

const initialCardList = new Section({
  renderer: (cardData) => {
    const card = createCard(cardData.title, cardData.link);

    initialCardList.setItem(card);
  }
}, cardList);

initialCardList.renderItems(cardData);
