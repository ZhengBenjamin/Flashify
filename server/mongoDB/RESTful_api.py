from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
import os

class Database_Manager:
	"""
	Manages the connection to the MongoDB database and provides methods for interacting with the database.
	"""

	def setup_connection(self):
		"""
		Connects to the MongoDB database and returns the database object
		"""
		load_dotenv(find_dotenv())
		password = os.environ.get("MONGODB_PWD")
		connection_string = f"mongodb+srv://WasherBuddie:{password}@washerbuddie.2izth.mongodb.net/?retryWrites=true&w=majority&appName=WasherBuddie"
		client = MongoClient(connection_string)
		washerbuddie_db = client.WasherBuddie
		return washerbuddie_db
	
    #add delete users
	
    #add flashcards and notes
	
    #modify flashcards and notes