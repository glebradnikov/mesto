import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Объявление переменных

const profileEditButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileWorkplace = document.querySelector('.profile__workplace');
const profileAddButton = document.querySelector('.profile__add');

const elementsList = document.querySelector('.elements__list');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupForm = document.forms;
const popupForms = document.querySelectorAll('.popup__form');
const popupInput = document.querySelectorAll('.popup__input');
const popupError = document.querySelectorAll('.popup__error');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const formEditProfile = popupForm.editProfile;
const nameInputEditProfile = formEditProfile.elements.name;
const workplaceInputEditProfile = formEditProfile.elements.workplace;
const submitButtonEditProfile = formEditProfile.elements.submitButtonEditProfile;

const popupAddElement = document.querySelector('#popup-add-element');
const formAddElement = popupForm.addElement;
const titleInputAddElement = formAddElement.elements.title;
const urlInputAddElement = formAddElement.elements.url;
const submitButtonAddElement = formAddElement.elements.submitButtonAddElement;

const popupOpenImage = document.querySelector('#popup-open-image');
const imageOpenImage = popupOpenImage.querySelector('#image-open-image');
const imageCaptionOpenImage = popupOpenImage.querySelector('#image-caption-open-image');

// Шесть карточек «из коробки»

const initialElements = [
  {
    name: 'Сергиев Посад',
    link: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcT2sYSBCbVPFgNXBYpLGqM-6C6PhmuN8UA8-v1RkkPY_AeN6eEhEoSw34Mni_6ys49g'
  },
  {
    name: 'Переславль-Залесский',
    link: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSpJDJF-65H9WAIWtbLyASLQd1gyhDVDRTRoW87xU-zonvstAbHmZaZ2ej5q6Hxv4CC'
  },
  {
    name: 'Ростов',
    link: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSYXRn1yKNBefFGDE-9frz5ho_CFj71azeriOwyXIUiHoFujCg3DFBOTxqKsdwsMhBJ'
  },
  {
    name: 'Ярославль',
    link: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQVHNx0mp2o8d1SqsaygMQRaT9gs_2jOv2UrnXVGQ60rbAyQFCeYGWTgPp81ryLO50y'
  },
  {
    name: 'Кострома',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ipatiev02.jpg/1280px-Ipatiev02.jpg'
  },
  {
    name: 'Иваново',
    link: 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQZNA0WIEbiKWwk1wMlQ_4L6Iz0l21P9KlQQsJ2R5mwatNicThwQuadMcX6mA8jtPf2'
  },
  {
    name: 'Владимир',
    link: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR3_4lzwSClrnXLzBchtnOLQd5tqqGjPz-IscBlPa8uinSlqxaCSH-7_kJazYGbXJBL'
  },
];

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
const openPopupOpenImage = (name, link) => {
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

const createCard = (name, link) => {
  const newCard = new Card(
    {
      name,
      link,
    }, '.template', openPopupOpenImage);

  return newCard.generateCard();
};

initialElements.forEach(initialData => {
  const card = createCard(initialData.name, initialData.link);

  elementsList.append(card);
});

// Добавление карточки
const submitFormAddElement = (event) => {
  event.preventDefault();

  const card = createCard(titleInputAddElement.value, urlInputAddElement.value);

  elementsList.prepend(card);

  closePopup(popupAddElement);
};

formAddElement.addEventListener('submit', submitFormAddElement);
