export default class UserInfo {
  constructor({ avatar, name, about }) {
    this._avatar = avatar;
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
