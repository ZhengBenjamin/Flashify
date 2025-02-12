class FlashDeck {
  constructor(deckname, topic, cards = []) {
    this.deckname = deckname;
    this.topic = topic;
    this.listOfCards = cards; // list of Flashcard
    this.index = 0;
    this.maxSize = 100;
  }

  addCard(card) {
    if (this.listOfCards.length < this.maxSize) {
      this.listOfCards.push(card);
      return true;
    }
    return false;
  }

  deleteCard(card) {
    this.listOfCards = this.listOfCards.filter(c => c !== card);
  }

  hasNext() {
    return this.index < this.listOfCards.length;
  }

  next() {
    if (this.hasNext()) {
      return this.listOfCards[this.index++];
    }
  }

  reset() {
    this.index = 0;
  }

  iterate() {
    while (this.hasNext()) {
      let currentCard = this.next();
      currentCard.flip();
    }
  }

  scramble() {
    this.listOfCards.sort(() => Math.random() - 0.5);
    this.index = 0;
  }
}
