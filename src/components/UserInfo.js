export class UserInfo {
  constructor({ selectorUserName, selectorUserAbout, selectorUserAvatar }) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileAbout = document.querySelector(selectorUserAbout);
    this._profileAvatar = document.querySelector(selectorUserAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;
  }
}