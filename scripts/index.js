let profileName = document.querySelector('.profile__name');
let profileEdit = document.querySelector('.profile__edit');
let profileJob = document.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');
let popupInputProfileName = popup.querySelector('.popup__input_profile_name');
let popupInputProfileJob = popup.querySelector('.popup__input_profile_job');

function openPopup() {
  popup.classList.add('popup_active');

  popupInputProfileName.value = profileName.textContent;
  popupInputProfileJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_active');
}

function popupFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputProfileName.value;
  profileJob.textContent = popupInputProfileJob.value;

  closePopup();
}

profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', popupFormSubmitHandler);
