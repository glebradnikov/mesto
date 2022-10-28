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

  nameInputEditProfile.value = profileName.textContent;
  workplaceInputEditProfile.value = profileWorkplace.textContent;

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
  const formList = Array.from(popupForm);

  formList.forEach((form, input, inputError, errorMessageActive, submitButton, submitButtonDisabled) => {
    setEventListeners(form, input, inputError, errorMessageActive, submitButton, submitButtonDisabled);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  form: '.popup__form',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  errorMessageActive: 'popup__error_active',
  submitButton: '.popup__submit',
  submitButtonDisabled: 'popup__submit_disabled',
});
