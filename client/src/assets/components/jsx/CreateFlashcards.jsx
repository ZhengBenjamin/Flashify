import { useState, useContext } from 'react';
import { Modal, Container, Group, Card, Text, Button, TextInput } from '@mantine/core';
import classes from '../css/CreateFlashcards.module.css';
import { UserContext } from '../../../App'; // Import UserContext

export default function CreateFlashcards({ opened, onClose }) {
  const { username } = useContext(UserContext); // Get the username from global state
  const [deckTitle, setDeckTitle] = useState('');
  const [flashcardsData, setFlashcardsData] = useState([{ front: '', back: '' }]); // Start with one empty card
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcardsData[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < flashcardsData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleAddFlashcard = () => {
    setFlashcardsData([...flashcardsData, { front: '', back: '' }]); // Add an empty flashcard to the list
    setCurrentCardIndex(flashcardsData.length); // Move to the new card
    setIsFlipped(false); // Start with the front of the card
  };

  const handleChangeFront = (e) => {
    const updated = [...flashcardsData];
    updated[currentCardIndex].front = e.target.value;
    setFlashcardsData(updated); // Update the front of the current card
  };

  const handleChangeBack = (e) => {
    const updated = [...flashcardsData];
    updated[currentCardIndex].back = e.target.value;
    setFlashcardsData(updated); // Update the back of the current card
  };

  // Collect the flashcards data (ensure that we're capturing valid front and back)
  const collectFlashcards = () => {
    return flashcardsData.filter(card => card.front.trim() && card.back.trim()); // Filter out empty cards
  };

  const handleSubmit = async () => {
    if (!deckTitle.trim()) {
      alert("Deck title is required!");
      return;
    }

    const collectedFlashcards = collectFlashcards(); // Collect all flashcards

    if (collectedFlashcards.length === 0) {
      alert("At least one flashcard is required!");
      return;
    }

    try {
      // Step 1: Create the Flashdeck
      const deckResponse = await fetch("http://localhost:4000/api/deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username, // Use the global username
          title: deckTitle,
        }),
      });

      if (!deckResponse.ok) {
        throw new Error("Failed to create deck");
      }

      const deckData = await deckResponse.json();
      const deckId = deckData.deck.deck_id; // Get the deck ID from the response

      // Step 2: Create Flashcards for that deck
      const cardPromises = collectedFlashcards.map((card) =>
        fetch("http://localhost:4000/api/card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username, // Use the global username
            deck_id: deckId,
            front: card.front,
            back: card.back,
          }),
        })
      );

      // Wait for all the flashcards to be created
      await Promise.all(cardPromises);

      alert("Deck and flashcards saved successfully!");

      // Reset form
      setDeckTitle("");
      setFlashcardsData([{ front: "", back: "" }]);
      setCurrentCardIndex(0);
      setIsFlipped(false);

      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving deck and flashcards:", error);
      alert("Error saving deck and flashcards. Please try again.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create Flashcard Deck"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
      centered
      className={classes.modal}
    >
      <Container className={classes.container}>
        <TextInput
          label="Deck Title"
          placeholder="Enter deck title"
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.target.value)}
          className={classes.titleInput}
        />

        <Group position="apart" className={classes.infoGroup}>
          <Text>
            Flashcard: {currentCardIndex + 1}/{flashcardsData.length}
          </Text>
        </Group>

        <Group position="center" className={classes.cardGroup}>
          <Card className={classes.card} onClick={handleFlip}>
            <Text className={classes.text}>
              {isFlipped
                ? currentCard.back || 'Back side is empty'
                : currentCard.front || 'Front side is empty'}
            </Text>
          </Card>
        </Group>

        <Group position="center" className={classes.buttonGroup}>
          <Button className={classes.button} onClick={handleFlip}>
            Flip
          </Button>
        </Group>

        <Group direction="column" className={classes.inputGroup}>
          <TextInput
            label="Front"
            placeholder="Enter front text"
            value={currentCard.front}
            onChange={handleChangeFront}
          />
          <TextInput
            label="Back"
            placeholder="Enter back text"
            value={currentCard.back}
            onChange={handleChangeBack}
          />
        </Group>

        <Group position="apart" className={classes.navGroup}>
          <Button className={classes.button} onClick={handlePrev} disabled={currentCardIndex === 0}>
            Previous
          </Button>
          <Button
            className={classes.button}
            onClick={handleNext}
            disabled={currentCardIndex === flashcardsData.length - 1}
          >
            Next
          </Button>
          <Button className={classes.button} onClick={handleAddFlashcard}>
            Add Flashcard
          </Button>
        </Group>

        <Group position="center" className={classes.saveGroup}>
          <Button className={classes.button} onClick={handleSubmit}>
            Save Deck
          </Button>
        </Group>
      </Container>
    </Modal>
  );
}
