// Валидация формы

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
};

// Функция, которая добавляет класс с ошибкой
const showError = (form, input, error, settings) => {
  const inputError = form.querySelector(`#${input.id}-error`);

  input.classList.add(settings.inputErrorClass);
  inputError.textContent = error;
  inputError.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideError = (form, input, settings) => {
  const inputError = form.querySelector(`#${input.id}-error`);

  input.classList.remove(settings.inputErrorClass);
  inputError.classList.remove(settings.inputErrorClass);
  inputError.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (form, input, settings) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, settings);
  } else {
    hideError(form, input, settings);
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
const toggleButtonState = (inputs, button, settings) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  };
};

const setEventListeners = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector('.popup__submit');

  toggleButtonState(inputs, button, settings);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
};

// Добавление обработчиков всем формам
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(settings);
