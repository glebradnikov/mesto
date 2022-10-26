// Валидация формы

// Функция, которая добавляет класс с ошибкой
const showError = (form, input, errorMessage) => {
  const inputError = form.querySelector(`#${input.id}-error`);

  input.classList.add('popup__input_type_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('popup__error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideError = (form, input) => {
  const inputError = form.querySelector(`#${input.id}-error`);

  input.classList.remove('popup__input_type_error');
  inputError.classList.remove('popup__error_active');
  inputError.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add('popup__submit_disabled');
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove('popup__submit_disabled');
    button.removeAttribute('disabled');
  };
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__submit');

  editProfilePopupInputName.value = profileName.textContent;
  editProfilePopupInputWorkplace.value = profileWorkplace.textContent;

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
};

// Добавление обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(form);
  });
};

enableValidation({
  popupForm: '.popup__form',
  popupInput: '.popup__input',
  popupInputError: 'popup__input_type_error',
  popupSubmitButton: '.popup__submit',
  popupSubmitButtonDisabled: 'popup__submit_disabled',
  popupErrorMessage: 'popup__error'
});
