import { useState, useContext } from 'react';
import { Modal, Container, Group, Card, Text, Button, TextInput } from '@mantine/core';
import classes from '../css/CreateFlashcards.module.css';
import { UserContext } from '../../../App'; // Import UserContext

export default function CreateFlashcards({ opened, onClose }) {
  const { username } = useContext(UserContext); // Get the username from global state
  const [deckTitle, setDeckTitle] = useState('');
  const [flashcardsData, setFlashcardsData] = useState([{ front: '', back: '' }]);
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
    setFlashcardsData([...flashcardsData, { front: '', back: '' }]);
    setCurrentCardIndex(flashcardsData.length);
    setIsFlipped(false);
  };

  const handleChangeFront = (e) => {
    const updated = [...flashcardsData];
    updated[currentCardIndex].front = e.target.value;
    setFlashcardsData(updated);
  };

  const handleChangeBack = (e) => {
    const updated = [...flashcardsData];
    updated[currentCardIndex].back = e.target.value;
    setFlashcardsData(updated);
  };

  const handleSubmit = async () => {
    if (!deckTitle.trim()) {
      alert("Deck title is required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username, // Use the global username
          title: deckTitle,
          flashcards: flashcardsData, // Send flashcards to backend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save deck");
      }

      const data = await response.json();
      console.log("Flashdeck saved:", data);
      alert("Deck saved successfully!");

      // Reset form
      setDeckTitle("");
      setFlashcardsData([{ front: "", back: "" }]);
      setCurrentCardIndex(0);
      setIsFlipped(false);

      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving deck:", error);
      alert("Error saving deck. Please try again.");
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
