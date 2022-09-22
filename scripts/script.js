// Получить элементы

const popupOpenButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

// Навесить слушатель на клик по кнопке .profile__edit

popupOpenButton.addEventListener('click', popupToggle);

// Навесить слушатель на клик по кнопке .popup__close

popupCloseButton.addEventListener('click', popupToggle);

// Применение всплытия

const closePopupByClickOnOverlay = function (event) {
  if (event.target == event.currentTarget) {
    popupToggle();
  }
}

popup.addEventListener('click', closePopupByClickOnOverlay);

// Находим форму в DOM

let formElement = popup.querySelector('.popup__form');
// Находим поля формы в DOM

let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

nameInput.value = profileName.innerHTML;
jobInput.value = profileJob.innerHTML;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);
