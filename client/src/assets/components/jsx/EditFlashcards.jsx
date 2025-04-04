import { useState, useContext, useEffect } from 'react';
import {
  Modal,
  Container,
  Group,
  Card,
  Text,
  Button,
  TextInput
} from '@mantine/core';
import classes from '../css/CreateFlashcards.module.css';
import { UserContext } from '../../../App';

export default function EditFlashcards({ opened, onClose, deck, onSave }) {
  const { username } = useContext(UserContext);

  const [deckTitle, setDeckTitle] = useState('');
  // flashcardsData will be an array of objects; each may include an `id` for existing cards.
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fetch the flashcards when the modal is opened and the deck prop is available
  useEffect(() => {
    // Only fetch if the modal is open and we have a deck with a deck_id
    if (opened && deck && deck.deck_id) {
      // Set the title
      setDeckTitle(deck.title || '');
      setCurrentCardIndex(0);
      setIsFlipped(false);

      // Fetch all flashcards for this deck from /api/card?username=...&deck_id=...
      fetch(`http://localhost:4000/api/card?username=${username}&deck_id=${deck.deck_id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch flashcards');
          }
          return res.json();
        })
        .then((flashcards) => {
          // Convert flashcards from the API into our editing format
          const formatted = flashcards.map((fc) => ({
            id: fc._id,       // Mongoose _id
            front: fc.front,
            back: fc.back
          }));
          setFlashcardsData(formatted);
        })
        .catch((error) => {
          console.error('Error fetching flashcards:', error);
          // Fallback: if there is an error, we at least initialize an empty array
          setFlashcardsData([]);
        });
    }
  }, [opened, deck, username]);

  // Current card
  const currentCard = flashcardsData[currentCardIndex] || { front: '', back: '' };

  // --- Navigation & flipping logic ---
  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < flashcardsData.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleAddFlashcard = () => {
    // Add a new blank card
    setFlashcardsData((prev) => [...prev, { front: '', back: '' }]);
    // Move to the newly created card
    setCurrentCardIndex(flashcardsData.length);
    setIsFlipped(false);
  };

  const handleDeleteFlashcard = () => {
    if (flashcardsData.length <= 1) {
      alert("At least one flashcard is required.");
      return;
    }

    const updated = flashcardsData.filter((_, index) => index !== currentCardIndex);
    setFlashcardsData(updated);

    // Adjust the current index if we were on the last card
    if (currentCardIndex >= updated.length) {
      setCurrentCardIndex(updated.length - 1);
    }
  };

  // --- Updating front/back text ---
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

  // Filter out cards that don't have both front and back text
  const collectFlashcards = () => {
    return flashcardsData.filter((card) => card.front.trim() && card.back.trim());
  };

  // --- Saving Changes ---
  const handleSubmit = async () => {
    if (!deckTitle.trim()) {
      alert("Deck title is required!");
      return;
    }
    const collectedFlashcards = collectFlashcards();
    if (collectedFlashcards.length === 0) {
      alert("At least one flashcard is required!");
      return;
    }

    try {
      // 1. Update the deck's title via your flashdeck update API (using the deck's MongoDB _id)
      const deckResponse = await fetch(`http://localhost:4000/api/deck/${deck._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: deckTitle })
      });
      if (!deckResponse.ok) {
        throw new Error("Failed to update deck title");
      }

      // 2. Update or create flashcards.
      // For each flashcard in the modal, if it has an id we update it; if not, we create a new one.
      const updatePromises = collectedFlashcards.map(async (card) => {
        if (card.id) {
          // Update existing flashcard by its MongoDB _id
          const res = await fetch(`http://localhost:4000/api/card/${card.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ front: card.front, back: card.back })
          });
          if (!res.ok) {
            throw new Error("Failed to update flashcard");
          }
          return res.json();
        } else {
          // Create a new flashcard
          const res = await fetch(`http://localhost:4000/api/card`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              deck_id: deck.deck_id,
              front: card.front,
              back: card.back
            })
          });
          if (!res.ok) {
            throw new Error("Failed to create flashcard");
          }
          return res.json();
        }
      });

      await Promise.all(updatePromises);

      alert("Deck and flashcards updated successfully!");
      if (onSave) onSave(); // Let the parent re-fetch or refresh
      onClose();
    } catch (error) {
      console.error("Error updating deck and flashcards:", error);
      alert("Error updating deck and flashcards. Please try again.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Flashcard Deck"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
      centered
      className={classes.modal}
    >
      <Container className={classes.container}>
        {/* Deck Title */}
        <TextInput
          label="Deck Title"
          placeholder="Enter deck title"
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.target.value)}
          className={classes.titleInput}
        />

        {/* Flashcard Navigation Info & Delete Button */}
        <Group position="apart" className={classes.infoGroup}>
          <Text>
            Flashcard: {currentCardIndex + 1}/{flashcardsData.length}
          </Text>
          <Button
            color="red"
            onClick={handleDeleteFlashcard}
            disabled={flashcardsData.length <= 1}
          >
            Delete Card
          </Button>
        </Group>

        {/* Flashcard Display (click to flip) */}
        <Group position="center" className={classes.cardGroup}>
          <Card className={classes.card} onClick={handleFlip}>
            <Text className={classes.text}>
              {isFlipped
                ? currentCard.back || 'Back side is empty'
                : currentCard.front || 'Front side is empty'}
            </Text>
          </Card>
        </Group>

        {/* Flip Button */}
        <Group position="center" className={classes.buttonGroup}>
          <Button className={classes.button} onClick={handleFlip}>
            Flip
          </Button>
        </Group>

        {/* Editable Fields for the Current Card */}
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

        {/* Card Navigation & Add Button */}
        <Group position="apart" className={classes.navGroup}>
          <Button
            className={classes.button}
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
          >
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

        {/* Save Changes */}
        <Group position="center" className={classes.saveGroup}>
          <Button className={classes.button} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Group>
      </Container>
    </Modal>
  );
}
