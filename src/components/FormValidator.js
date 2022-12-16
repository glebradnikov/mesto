export default class FormValidator {
  constructor(form, validationConfig) {
    this._form = form;
    this._input = validationConfig.input;
    this._inputError = validationConfig.inputError;
    this._error = validationConfig.error;
    this._submitButton = validationConfig.submitButton;
    this._submitButtonDisabled = validationConfig.submitButtonDisabled;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._submitButtonElement = this._form.querySelector(this._submitButton);
  }

  _showError(input) {
    this._inputErrorMessage = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputError);
    this._inputErrorMessage.classList.add(this._error);
    this._inputErrorMessage.textContent = input.validationMessage;
  }

  _hideError(input) {
    this._inputErrorMessage = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._inputError);
    this._inputErrorMessage.classList.remove(this._error);
    this._inputErrorMessage.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._submitButtonDisabled);
      this._submitButtonElement.disabled = true;
    } else {
      this._submitButtonElement.classList.remove(this._submitButtonDisabled);
      this._submitButtonElement.disabled = false;
    };
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  hideAllErrors() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideError(input);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
