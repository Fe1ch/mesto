export class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileJob = document.querySelector(selectorUserJob);
    this._profileAvatar = document.querySelector(selectorUserAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;

  }

  setUserAvatar({ avatarLink }) {
    this._profileAvatar.src = avatarLink;
  }
}