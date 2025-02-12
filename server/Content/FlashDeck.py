import Flashcard

class FlashDeck:

    def __init__(self, deckname, topic, cards):
        self.deckname = deckname
        self.topic = topic
        self.listOfCards = cards #list of Flashcard
        self.index = 0
        self.maxSize = 100

    def addCard(self, card):
        if len(self.listOfCards) < self.maxSize:
            self.listOfCards.append(card)
            return True
        else:
            return False

    def deleteCard(self, card):
        pass

    def hasNext(self):
        if(self.index < len(self.listOfCards)):
            return True
        else:
            return False
    
    def next(self):
        if(self.hasNext()):
            self.index = self.index + 1
            return self.listOfCards[self.index -1]
        
    def reset(self):
        self.index = 0

    def iterate(self):
        while(self.hasNext()):
            #delays?
            currentCard = self.next()
            currentCard.flip()

    def scramble(self):
        #scramble list, set index to 0
        pass