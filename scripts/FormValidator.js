export class FormValidator {
  constructor(form, validationElements) {
    this._form = form;
    this._input = validationElements.input;
    this._inputError = validationElements.inputError;
    this._error = validationElements.error;
    this._submitButton = validationElements.submitButton;
    this._submitButtonDisabled = validationElements.submitButtonDisabled;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._submitButtonElement = this._form.querySelector('.popup__submit');
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  _showError(input) {
    const inputError = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputError);
    inputError.classList.add(this._error);
    inputError.textContent = input.validationMessage;
  }

  _hideError(input) {
    const inputError = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._inputError);
    inputError.classList.remove(this._error);
    inputError.textContent = '';
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
      this._submitButtonElement.setAttribute('disabled', '');
    } else {
      this._submitButtonElement.classList.remove(this._submitButtonDisabled);
      this._submitButtonElement.removeAttribute('disabled');
    };
  };

  enableValidation() {
    this._setEventListeners();
  }
}
