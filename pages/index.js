import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  profileEditButton,
  profileName,
  profileWorkplace,
  profileAddButton,
  elementsList,
  popupCloseButtons,
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
  initialElements
} from '../utils/constants.js';

// Элементы валидации

const validationConfig = {
  form: '.popup__form',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  error: 'popup__error_active',
  submitButton: '.popup__submit',
  submitButtonDisabled: 'popup__submit_disabled',
};

// Открыть попап

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  popup.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
};

// Закрыть попап

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('mousedown', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEscape);
};

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

// Закрытие попапа кликом на оверлей

const closePopupOverlay = (event) => {
  if (event.target === event.currentTarget && event.which === 1) {
    closePopup(event.target);
  }
};

// Закрытие попапа нажатием на Esc

const closePopupEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
};

// Форма редактирования профиля

const newFormValidatorEditProfile = new FormValidator(formEditProfile, validationConfig);
newFormValidatorEditProfile.enableValidation();

// Открыть форму редактирования профиля
const openPopupEditProfile = () => {
  nameInputEditProfile.value = profileName.textContent;
  workplaceInputEditProfile.value = profileWorkplace.textContent;
  newFormValidatorEditProfile.hideAllErrors();

  openPopup(popupEditProfile);
};

profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправить форму редактирования профиля
const submitFormEditProfile = (event) => {
  event.preventDefault();

  profileName.textContent = nameInputEditProfile.value;
  profileWorkplace.textContent = workplaceInputEditProfile.value;

  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', submitFormEditProfile);

// Форма карточки

// Открыть форму карточки
export const openPopupOpenImage = (name, link) => {
  imageOpenImage.src = link;
  imageOpenImage.setAttribute('alt', name);
  imageCaptionOpenImage.textContent = name;

  openPopup(popupOpenImage);
};

// Форма добавления карточки

const newFormValidatorAddElement = new FormValidator(formAddElement, validationConfig);
newFormValidatorAddElement.enableValidation();

// Открыть форму добавления карточки
const openAddElementPopup = () => {
  formAddElement.reset();
  newFormValidatorAddElement.hideAllErrors();

  openPopup(popupAddElement);
};

profileAddButton.addEventListener('click', openAddElementPopup);

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

// Добавление карточки
const submitFormAddElement = (event) => {
  event.preventDefault();

  const card = createCard(titleInputAddElement.value, urlInputAddElement.value);

  elementsList.prepend(card);

  closePopup(popupAddElement);
};

formAddElement.addEventListener('submit', submitFormAddElement);
