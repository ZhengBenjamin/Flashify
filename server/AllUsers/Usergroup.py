from abc import ABC, abstractmethod

class Usergroup(ABC):

	@property
	def username(self):
		return self._username

	@username.setter
	def user_name(self, username):
		self._user_name = username

	@property
	def password(self):
		return self._password
	
	@password.setter
	def password(self, password):
		self._password = password
	