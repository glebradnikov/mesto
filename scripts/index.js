// Объявление переменных

const profileEditButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileWorkplace = document.querySelector('.profile__workplace');
const profileAddButton = document.querySelector('.profile__add');

const elementsContainer = document.querySelector('.elements__list');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupForm = document.forms;
const popupInput = document.querySelectorAll('.popup__input');
const popupError = document.querySelectorAll('.popup__error');
const popupSubmitButtons = document.querySelectorAll('.popup__submit');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const formEditProfile = popupForm.editProfile;
const nameInputEditProfile = formEditProfile.elements.name;
const workplaceInputEditProfile = formEditProfile.elements.workplace;


const popupAddElement = document.querySelector('#popup-add-element');
const formAddElement = popupForm.addElement;
const titleInputAddElement = formAddElement.elements.title;
const urlInputAddElement = formAddElement.elements.url;

const popupOpenImage = document.querySelector('#popup-open-image');
const imageOpenImage = popupOpenImage.querySelector('#image-open-image');
const imageCaptionOpenImage = popupOpenImage.querySelector('#image-caption-open-image');

const template = document.querySelector('.template');

// Открыть попап

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  popup.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);

  popupInput.forEach((inputError) => {
    inputError.classList.remove('popup__input_type_error');
  });

  popupError.forEach((error) => {
    error.classList.remove('popup__error_active');
  });
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
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

// Закрытие попапа нажатием на Esc

const closePopupEscape = (event) => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);
  }
};

// Шесть карточек «из коробки»

const createElementItemNode = (name, link) => {
  const elementItem = template.content.cloneNode(true);
  const elementImage = elementItem.querySelector('.elements__image');
  const elementTitle = elementItem.querySelector('.elements__title');

  elementImage.src = link;
  elementImage.setAttribute('alt', name);
  elementTitle.textContent = name;

  // Лайк карточки

  const elementLikeButton = elementItem.querySelector('.elements__like');

  const handleElementLikeButton = (event) => {
    event.target.classList.toggle('elements__like_active');
  };

  elementLikeButton.addEventListener('click', handleElementLikeButton);

  // Удаление карточки

  const elementDeleteButton = elementItem.querySelector('.elements__delete');

  const deleteElementItem = () => {
    const elementItem = elementDeleteButton.closest('.elements__item');

    elementItem.remove();
  };

  elementDeleteButton.addEventListener('click', deleteElementItem);

  // Открытие попапа с картинкой

  // Открыть попап с картинкой
  const openPopupOpenImage = () => {
    imageOpenImage.src = link;
    imageOpenImage.setAttribute('alt', name);
    imageCaptionOpenImage.textContent = name;

    openPopup(popupOpenImage);
  };

  elementImage.addEventListener('click', openPopupOpenImage);

  return elementItem;
};

// Отобразить элементы
const renderElementItemNode = () => {
  intialElements.forEach((item) => {
    const elementItemNode = createElementItemNode(item.name, item.link);

    elementsContainer.append(elementItemNode);
  });
};

renderElementItemNode();

// Форма редактирования профиля

// Открыть форму редактирования профиля
const openPopupEditProfile = () => {
  nameInputEditProfile.value = profileName.textContent;
  workplaceInputEditProfile.value = profileWorkplace.textContent;

  popupSubmitButtons.forEach((button) => {
    button.classList.remove('popup__submit_disabled');
    button.removeAttribute('disabled');
  });

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

// Форма добавления карточки

// Открыть форму добавления карточки
const openAddElementPopup = () => {
  formAddElement.reset();

  popupSubmitButtons.forEach((button) => {
    button.classList.add('popup__submit_disabled');
    button.setAttribute('disabled', '');
  });

  openPopup(popupAddElement);
};

profileAddButton.addEventListener('click', openAddElementPopup);

// Добавление карточки

// Добавить карточку
const submitFormAddElement = (event) => {
  event.preventDefault();

  const elementItem = createElementItemNode(titleInputAddElement.value, urlInputAddElement.value);

  elementsContainer.prepend(elementItem);
  event.target.reset();

  popupSubmitButtons.forEach((button) => {
    button.classList.add('popup__submit_disabled');
    button.setAttribute('disabled', '');
  });

  closePopup(popupAddElement);
};

formAddElement.addEventListener('submit', submitFormAddElement);
