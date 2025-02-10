import Usergroup

class Admin(Usergroup):
	def __init__(self, username, password='password1'):
		self._username = username #unique userID
		self.contentManager = False
		self._password = password
	
	@property
	def username(self):
		return self._username

	@username.setter
	def username(self, username):
		self._username = username

	@property
	def password(self):
		return self._password
	
	@password.setter
	def password(self, password):	
		self._password = password
	
