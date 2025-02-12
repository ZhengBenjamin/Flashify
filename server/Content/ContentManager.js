class ContentManager {
  /**
   * Manages content and makes API calls to the database
   * Fetches data from the database
   */
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
  }

  accessDatabase() {
    // Implementation for database access
  }

  makeFlashdeck() {
    // Implementation for creating a flash deck
  }

  makeFlashcards() {
    const front = "f1";
    const back = "b1";
    const card = new Flashcard(front, back);
  }

  addCardToDeck() {
    // Implementation for adding a card to a deck
  }

  deleteCardFromDeck() {
    // Implementation for deleting a card from a deck
  }

  practiceFlashdeck(flashdeck) {
    // Implementation for practicing a flash deck
    // Iterate through the flash deck
    // Maintain separate lists for known and unknown cards
  }
}
