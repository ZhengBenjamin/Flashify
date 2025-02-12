class Usergroup {
  constructor() {
    this._username = "";
    this._password = "";
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }
}
