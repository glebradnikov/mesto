// Форма редактирования профиля

const editProfile = document.querySelector('#edit-profile');
const editProfileCloseButton = document.querySelector('.popup__close_edit-profile');
const popupFormEditProfile = document.querySelector('.popup__form_edit_profile');
const popupInputProfileName = document.querySelector('.popup__input_profile_name');
const popupInputProfileWorkplace = document.querySelector('.popup__input_profile_workplace');
const profileEditButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileWorkplace = document.querySelector('.profile__workplace');

const openEditProfilePopup = () => {
  editProfile.classList.add('popup_active');

  popupInputProfileName.value = profileName.textContent;
  popupInputProfileWorkplace.value = profileWorkplace.textContent;
};

const closeEditProfilePopup = () => {
  editProfile.classList.remove('popup_active');
};

const editProfileSubmitHandler = (event) => {
  event.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileWorkplace.textContent = popupInputProfileWorkplace.value;

  closeEditProfilePopup();
}

profileEditButton.addEventListener('click', openEditProfilePopup);
editProfileCloseButton.addEventListener('click', closeEditProfilePopup);
popupFormEditProfile.addEventListener('submit', editProfileSubmitHandler);

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

  elementsImage.alt = elementsTitle.textContent;

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

  const imagePopup = document.querySelector('.popup-image');
  const imagePopupCloseButton = document.querySelector('.popup-image__close');
  const imagePopupImage = document.querySelector('.popup-image__image');
  const imagePopupCaption = document.querySelector('.popup-image__caption');

  const openImagePopup = () => {
    imagePopup.classList.add('popup-image_active');
    imagePopupImage.src = elementsImage.src;
    imagePopupImage.alt = elementsImage.alt;
    imagePopupCaption.textContent = elementsTitle.textContent;
  };

  const closeImagePopup = () => {
    imagePopup.classList.remove('popup-image_active');
  };

  elementsImage.addEventListener('click', openImagePopup);
  imagePopupCloseButton.addEventListener('click', closeImagePopup);

  return itemNode;
};

render();

// Форма добавления карточки

const addElement = document.querySelector('#add-element');
const addElementCloseButton = document.querySelector('.popup__close_add-element');
const profileAddButton = document.querySelector('.profile__add');

const openAddElementPopup = () => {
  addElement.classList.add('popup_active');
};

const closeAddElementPopup = () => {
  addElement.classList.remove('popup_active');
};

profileAddButton.addEventListener('click', openAddElementPopup);
addElementCloseButton.addEventListener('click', closeAddElementPopup);

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
