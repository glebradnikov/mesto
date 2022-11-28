export default class UserInfo {
  constructor({ name, workplace }) {
    this._name = name;
    this._workplace = workplace;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      workplace: this._workplace.textContent
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._workplace.textContent = data.workplace;
  }
}
