import '../pages/index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileAvatarButton,
  profileImage,
  profileName,
  profileAbout,
  profileEditButton,
  profileAddButton,
  cardContainer,
  popupEditProfile,
  formEditProfile,
  nameEditProfile,
  aboutEditProfile,
  popupAddCard,
  formAddCard,
  popupImage,
  popupConfirm,
  popupAvatar,
  formAvatar,
  apiConfig,
  validationConfig,
} from '../utils/constants.js';

let userId;

const api = new Api(apiConfig);

// Форма обновления аватара

const formValidatorAvatar = new FormValidator(formAvatar, validationConfig);

formValidatorAvatar.enableValidation();

const popupWithFormAvatar = new PopupWithForm(popupAvatar, (data) => {
  api
    .editAvatar(data)
    .then(() => {
      userInfo.setAvatar(data);
      popupWithFormAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => popupWithFormAvatar.renderLoading(false));
});

popupWithFormAvatar.setEventListeners();

const openPopupAvatar = () => {
  formValidatorAvatar.hideAllErrors();
  popupWithFormAvatar.open();
};

profileAvatarButton.addEventListener('click', openPopupAvatar);

// Форма редактирования профиля

const userInfo = new UserInfo({
  avatar: profileImage,
  name: profileName,
  about: profileAbout,
});

const formValidatorEditProfile = new FormValidator(
  formEditProfile,
  validationConfig
);

formValidatorEditProfile.enableValidation();

const popupWithFormEditProfile = new PopupWithForm(popupEditProfile, (data) => {
  api
    .editUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupWithFormEditProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => popupWithFormEditProfile.renderLoading(false));
});

popupWithFormEditProfile.setEventListeners();

const openPopupEditProfile = () => {
  const userInfoData = userInfo.getUserInfo();

  nameEditProfile.value = userInfoData.name;
  aboutEditProfile.value = userInfoData.about;

  formValidatorEditProfile.hideAllErrors();
  popupWithFormEditProfile.open();
};

profileEditButton.addEventListener('click', openPopupEditProfile);

// Форма добавления карточки

const formValidatorAddCard = new FormValidator(formAddCard, validationConfig);

formValidatorAddCard.enableValidation();

const popupWithFormAddCard = new PopupWithForm(popupAddCard, (data) => {
  api
    .addCard(data)
    .then((result) => {
      const card = createCard(result);

      cardsSection.addItem(card);
      popupWithFormAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => popupWithFormAddCard.renderLoading(false));
});

popupWithFormAddCard.setEventListeners();

const openPopupAddCard = () => {
  formValidatorAddCard.hideAllErrors();
  popupWithFormAddCard.open();
};

profileAddButton.addEventListener('click', openPopupAddCard);

// Форма карточки

const popupWithImage = new PopupWithImage(popupImage);

popupWithImage.setEventListeners();

const openPopupImage = (name, link) => {
  popupWithImage.open(name, link);
};

// Форма подтверждения

const popupWithConfirm = new PopupWithConfirm(popupConfirm);

popupWithConfirm.setEventListeners();

// Карточки «из коробки»

const createCard = (data) => {
  data.userId = userId;

  const card = new Card(
    data,
    '.template',
    openPopupImage,
    () => {
      popupWithConfirm.open(data);

      popupWithConfirm.submitHandler(() => {
        api
          .deleteCard(data._id)
          .then(() => {
            card.remove();

            popupWithConfirm.close();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    () => {
      api
        .addLike(data._id)
        .then((result) => {
          card.like();
          card.likeCounter(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    () => {
      api
        .deleteLike(data._id)
        .then((result) => {
          card.dislike();
          card.likeCounter(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );

  return card.generateCard();
};

const cardsSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);

      cardsSection.addItem(card);
    },
  },
  cardContainer
);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([data, cards]) => {
    userId = data._id;

    userInfo.setUserInfo(data);
    userInfo.setAvatar(data);
    cardsSection.renderItems(cards.reverse());
  })
  .catch((error) => {
    console.log(error);
  });
