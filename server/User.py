import Usergroup

class User(Usergroup):
    def __init__(self, user, password):
        self.username = user
        self.password = password

    def credentials(self):
        pass