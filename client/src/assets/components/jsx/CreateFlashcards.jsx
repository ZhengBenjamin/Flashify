import { useState, useContext, useEffect } from 'react';
import { Modal, Container, Group, Card, Text, Button, TextInput } from '@mantine/core';
import classes from '../css/CreateFlashcards.module.css';
import { UserContext } from '../../../App';

export default function CreateFlashcards({ opened, onClose, subject, onSubmit, editDeck }) {
  const { username } = useContext(UserContext);
  const [deckTitle, setDeckTitle] = useState('');
  const [flashcardsData, setFlashcardsData] = useState([{ front: '', back: '' }]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcardsData[currentCardIndex];

  useEffect(() => {
    if (editDeck) {
      setDeckTitle(editDeck.title);
      setFlashcardsData(
        editDeck.cards.map(card => ({
          _id: card._id,
          front: card.front,
          back: card.back,
        }))
      );
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } else {
      setDeckTitle('');
      setFlashcardsData([{ front: '', back: '' }]);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [editDeck]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

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

  const collectFlashcards = () => {
    return flashcardsData.filter(card => card.front.trim() && card.back.trim());
  };

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
      let deckId;

      if (editDeck) {
        const updateDeckRes = await fetch(`http://localhost:4000/api/deck/${editDeck._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: deckTitle }),
        });

        if (!updateDeckRes.ok) throw new Error("Failed to update deck");
        deckId = editDeck.deck_id;
      } else {
        const deckRes = await fetch("http://localhost:4000/api/deck", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            title: deckTitle,
            subject_id: subject.id,
          }),
        });

        if (!deckRes.ok) throw new Error("Failed to create deck");
        const data = await deckRes.json();
        deckId = data.deck.deck_id;
      }

      const cardPromises = collectedFlashcards.map((card) => {
        if (card._id) {
          return fetch(`http://localhost:4000/api/card/${card._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              front: card.front,
              back: card.back,
            }),
          });
        } else {
          return fetch("http://localhost:4000/api/card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              deck_id: deckId,
              front: card.front,
              back: card.back,
            }),
          });
        }
      });

      await Promise.all(cardPromises);

      alert(editDeck ? "Deck updated!" : "Deck and flashcards saved!");

      setDeckTitle('');
      setFlashcardsData([{ front: '', back: '' }]);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      onSubmit();
    } catch (error) {
      console.error("Error saving deck and flashcards:", error);
      alert("Error saving deck and flashcards. Please try again.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editDeck ? "Edit Flashcard Deck" : "Create Flashcard Deck"}
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
          <Text>Flashcard: {currentCardIndex + 1}/{flashcardsData.length}</Text>
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
          <Button className={classes.button} onClick={handleFlip}>Flip</Button>
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
