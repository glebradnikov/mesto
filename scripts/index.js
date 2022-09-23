let profileName = document.querySelector('.profile__name');
let profileEdit = document.querySelector('.profile__edit');
let profileJob = document.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');
let popupInputProfileName = popup.querySelector('.popup__input_profile_name');
let popupInputProfileJob = popup.querySelector('.popup__input_profile_job');

function popupToggle() {
  popup.classList.toggle('popup_active');

  popupInputProfileName.value = profileName.textContent;
  popupInputProfileJob.value = profileJob.textContent;
}

function popupFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileJob.textContent = popupInputProfileJob.value;

  popupToggle();
}

profileEdit.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', popupFormSubmitHandler);
