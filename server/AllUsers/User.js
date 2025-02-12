class User extends Usergroup {
  constructor(username, password = "password1") {
    super(username, password);
    this.contentManager = new ContentManager(this._username, this._password);
  }

  get contentManager() {
    return this._contentManager;
  }

  set contentManager(contentManager) {
    this._contentManager = new ContentManager(this._username, this._password);
  }
}


