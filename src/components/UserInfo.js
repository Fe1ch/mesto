export class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._profileName = selectorUserName;
    this._profileJob = selectorUserJob;
    this._profileAvatar = selectorUserAvatar;
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