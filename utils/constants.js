export const profileEditButton = document.querySelector('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileWorkplace = document.querySelector('.profile__workplace');
export const profileAddButton = document.querySelector('.profile__add');

export const elementsList = document.querySelector('.elements__list');

export const popupCloseButtons = document.querySelectorAll('.popup__close');

export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const formEditProfile = document.forms.editProfile;
export const nameInputEditProfile = formEditProfile.elements.name;
export const workplaceInputEditProfile = formEditProfile.elements.workplace;

export const popupAddElement = document.querySelector('#popup-add-element');
export const formAddElement = document.forms.addElement;
export const titleInputAddElement = formAddElement.elements.title;
export const urlInputAddElement = formAddElement.elements.url;

export const popupOpenImage = document.querySelector('#popup-open-image');

export const validationConfig = {
  form: '.popup__form',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  error: 'popup__error_active',
  submitButton: '.popup__submit',
  submitButtonDisabled: 'popup__submit_disabled',
};

export const initialElements = [
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
