// Форма редактирования профиля

const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupEditProfileCloseButton = document.querySelector('.popup__close_edit-profile');
const popupFormEditProfile = document.querySelector('.popup__form_edit_profile');
const popupInputProfileName = document.querySelector('.popup__input_profile_name');
const popupInputProfileWorkplace = document.querySelector('.popup__input_profile_workplace');
const profileEditButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileWorkplace = document.querySelector('.profile__workplace');


const openEditProfilePopup = () => {
  popupEditProfile.classList.add('popup_active');

  popupInputProfileName.value = profileName.textContent;
  popupInputProfileWorkplace.value = profileWorkplace.textContent;
};

const closeEditProfilePopup = () => {
  popupEditProfile.classList.remove('popup_active');
};

const popupEditProfileSubmitHandler = (event) => {
  event.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileWorkplace.textContent = popupInputProfileWorkplace.value;

  closeEditProfilePopup();
}

profileEditButton.addEventListener('click', openEditProfilePopup);
popupEditProfileCloseButton.addEventListener('click', closeEditProfilePopup);
popupFormEditProfile.addEventListener('submit', popupEditProfileSubmitHandler);



// Шесть карточек «из коробки»

const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsList = document.querySelector('.elements__list');

const render = () => {
  initialElements.forEach((item) => {
    const itemNode = createItemNode(item.name, item.link);

    elementsList.append(itemNode);
  });
};

const createItemNode = (name, link) => {
  const template = document.querySelector('.template');
  const itemNode = template.content.cloneNode(true);
  const elementsTitle = itemNode.querySelector('.elements__title');
  const elementsImage = itemNode.querySelector('.elements__image');

  elementsTitle.textContent = name;
  elementsImage.src = link;

  // Лайк карточки

  const elementsLikeButton = itemNode.querySelector('.elements__like');

  const activeElementsLikeButton = (event) => {
    event.target.classList.toggle('elements__like_active');
  };

  elementsLikeButton.addEventListener('click', activeElementsLikeButton);

  // Удаление карточки

  const elementsTrashButton = itemNode.querySelector('.elements__trash');

  const deleteElementsItem = () => {
    const elementsItem = elementsTrashButton.closest('.elements__item');
    elementsItem.remove();
  };

  elementsTrashButton.addEventListener('click', deleteElementsItem);

  // Открытие попапа с картинкой

  // const imagePopup = document.querySelector('.image-popup');

  // const imagePopupToggle = () => {
  //   imagePopup.classList.toggle('image-popup_active');
  // };

  // elementsImage.addEventListener('click', imagePopupToggle);

  return itemNode;
};

render();

// Форма добавления карточки

const popupAddElement = document.querySelector('.popup_add_element');
const popupAddElementCloseButton = document.querySelector('.popup__close_add-element');
const profileAddButton = document.querySelector('.profile__add');

const openAddElementPopup = () => {
  popupAddElement.classList.add('popup_active');
};

const closeAddElementPopup = () => {
  popupAddElement.classList.remove('popup_active');
};

profileAddButton.addEventListener('click', openAddElementPopup);
popupAddElementCloseButton.addEventListener('click', closeAddElementPopup);

// Добавление карточки

const popupFormAddElement = document.querySelector('.popup__form_add_element');
const popupInputElementTitle = document.querySelector('.popup__input_element_title');
const popupInputElementImage = document.querySelector('.popup__input_element_image');

const addElementsItem = (event) => {
  event.preventDefault();

  const elementsContainer = createItemNode(popupInputElementTitle.value, popupInputElementImage.value);

  elementsList.prepend(elementsContainer);

  closeAddElementPopup();
};

popupFormAddElement.addEventListener('submit', addElementsItem);
