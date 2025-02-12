class Admin extends Usergroup {
  constructor(username, password = "password1") {
    super(username, password);
    this.userManager = new UserManager(this);
  }
}