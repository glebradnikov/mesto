// Объявление переменных

let profileEditButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileWorkplace = document.querySelector('.profile__workplace');
const profileAddButton = document.querySelector('.profile__add');

const elementsList = document.querySelector('.elements__list');

const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('#edit-profile-popup');
const addElementPopup = document.querySelector('#add-element-popup');
const imagePopup = document.querySelector('#image-popup');
const closePopupButtons = document.querySelectorAll('.popup__close');
const editProfilePopupForm = editProfilePopup.querySelector('#edit-profile-popup-form');
const editProfilePopupInputName = editProfilePopup.querySelector('#edit-profile-popup-input-name');
const editProfilePopupInputWorkplace = editProfilePopup.querySelector('#edit-profile-popup-input-workplace');
const addElementPopupForm = addElementPopup.querySelector('#add-element-popup-form');
const addElementPopupInputTitle = addElementPopup.querySelector('#add-element-input-title');
const addElementPopupInputImage = addElementPopup.querySelector('#add-element-input-image');
const imagePopupImage = imagePopup.querySelector('#image-popup-image');
const imagePopupCaption = imagePopup.querySelector('#image-popup-caption');

const template = document.querySelector('.template');

// Открыть попап

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
};

// Закрыть попап

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('mousedown', closePopupOverlay);
};

closePopupButtons.forEach((button) => {
  const closePopupButton = button.closest('.popup');

  button.addEventListener('click', () => {
    closePopup(closePopupButton);
  });
});

// Закрытие попапа кликом на оверлей

const closePopupOverlay = (event) => {
  closePopup(event.target);
};

// Закрытие попапа нажатием на Esc

const closePopupEscape = (event) => {
  const openedPopup = document.querySelector('.popup_opened');

  if (event.key === 'Escape') {
    openedPopup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupEscape);
  }
};

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

const elementItemNode = (name, link) => {
  const elementsItemNode = template.content.cloneNode(true);
  const elementsImage = elementsItemNode.querySelector('.elements__image');
  const elementsTitle = elementsItemNode.querySelector('.elements__title');

  elementsImage.src = link;
  elementsImage.alt = elementsTitle.textContent;
  elementsTitle.textContent = name;

  // Лайк карточки

  const elementsLikeButton = elementsItemNode.querySelector('.elements__like');

  const activeElementsLikeButton = (event) => {
    event.target.classList.toggle('elements__like_active');
  };

  elementsLikeButton.addEventListener('click', activeElementsLikeButton);

  // Удаление карточки

  const elementsDeleteButton = elementsItemNode.querySelector('.elements__delete');

  const deleteElementsItem = () => {
    const elementsItem = elementsDeleteButton.closest('.elements__item');

    elementsItem.remove();
  };

  elementsDeleteButton.addEventListener('click', deleteElementsItem);

  // Открытие попапа с картинкой

  // Открыть попап с картинкой
  const openImagePopup = () => {
    imagePopupImage.src = elementsImage.src;
    imagePopupImage.alt = elementsImage.alt;
    imagePopupCaption.textContent = elementsTitle.textContent;

    openPopup(imagePopup);
  };

  elementsImage.addEventListener('click', openImagePopup);

  return elementsItemNode;
};

// Отобразить элементы
const renderelementItemNode = () => {
  initialElements.forEach((item) => {
    const elementsItemNode = elementItemNode(item.name, item.link);

    elementsList.append(elementsItemNode);
  });
};

renderelementItemNode();

// Форма редактирования профиля

// Открыть форму редактирования профиля
const openEditProfilePopup = () => {
  openPopup(editProfilePopup);
};

profileEditButton.addEventListener('click', openEditProfilePopup);

// Отправить форму редактирования профиля
const editProfile = (event) => {
  event.preventDefault();

  profileName.textContent = editProfilePopupInputName.value;
  profileWorkplace.textContent = editProfilePopupInputWorkplace.value;

  closePopup(editProfilePopup);
};

editProfilePopupForm.addEventListener('submit', editProfile);

// Форма добавления карточки

// Открыть форму добавления карточки
const openAddElementPopup = () => {
  openPopup(addElementPopup);
};

profileAddButton.addEventListener('click', openAddElementPopup);

// Добавление карточки

// Добавить карточку
const addElementsItem = (event) => {
  event.preventDefault();

  const elementsContainer = elementItemNode(addElementPopupInputTitle.value, addElementPopupInputImage.value);

  event.target.reset();
  elementsList.prepend(elementsContainer);

  closePopup(addElementPopup);
};

addElementPopupForm.addEventListener('submit', addElementsItem);
