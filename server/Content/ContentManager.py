from mongoDB.RESTful_api import Database_Manager
import Flashcard

class ContentManager:
    """
    Manages content and makes api calls to the database
    fetches data from the database
    """

    def __init__(self, user):
        user.username
        user.password

    def accessDatabase(self):
        pass

    def makeflashdeck(self):
        pass

    def makeflashcards(self):
        front = "f1"
        back = "b1"
        card = Flashcard(front, back)

    def addcardtodeck(self):
        pass
    
    def deletecardfromdeck(self):
        pass

    def practiceflashdeck(self, flashdeck): #Here or interactions manager?
        #get flashdeck
        #iterate flashdeck
        #have another 2 list for cards they know and cards they don't know?
        pass