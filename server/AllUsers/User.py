import Usergroup
import server.Content.ContentManager as ContentManager

class User(Usergroup):
	def __init__(self, username, password='password1'):
		self._username = username #unique userID
		self._password = password
		self.contentManager = ContentManager.contentManager(self._username, self.password)
	
	# @property
	# def username(self):
	# 	return self._username

	# @username.setter
	# def username(self, username):
	# 	self._username = username

	# @property
	# def password(self):
	# 	return self._password
	
	# @password.setter
	# def password(self, password):	
	# 	self._password = password

	@property
	def contentManager(self):
		return self.contentManager
	
	@contentManager.setter
	def contentManger(self):
		self.contentManger = ContentManager.contentManager(self)
	