class Flashcard:
    def __init__(self, front, back, topic=None):
        self.front = front
        self.back = back
        self.topic = topic
        self.showFront = True

    def __str__(self):
        return self.front(), self.back(), self.topic()
    
    @property
    def front(self):
        return self.front
    
    @front.setter
    def front(self, front):
        self.front = front
    
    @property
    def back(self):
        return self.back
    
    @back.setter
    def back(self, back):
        self.back = back
    
    @property
    def topic(self):
        return self.topic
    
    @topic.setter
    def topic(self, topic):
        self.topic = topic
    
    @property
    def showFront(self):
        return self.showFront
    
    @showFront.setter
    def showFront(self, showFront):
        self.showFront = showFront

    def flip(self):
        if (self.showFront()):
            self.showFront(False)
            return self.back()
        else:
            self.showFront(True)
            return self.front()
    
    
