export default class UserInfo {
  constructor({ name, workplace }) {
    this._name = document.querySelector(name);
    this._workplace = document.querySelector(workplace);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      workplace: this._workplace.textContent
    };
  }

  setUserInfo({ name, workplace }) {
    this._name.textContent = name;
    this._workplace.textContent = workplace;
  }
}
