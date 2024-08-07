export default class UserInfo {
  constructor({ name, title }) {
    this._name = document.querySelector(name);
    this._title = document.querySelector(title);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      title: this._title.textContent,
    };
  }
  setUserInfo(name, title) {
    this._name.textContent = name;
    this._title.textContent = title;
  }
}